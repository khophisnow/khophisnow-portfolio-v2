"use client";

import Image from "next/image";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { type ChangeEvent, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Clipboard,
  Download,
  FileJson,
  History,
  Import,
  PartyPopper,
  Play,
  Plus,
  RefreshCcw,
  Shuffle,
  Sparkles,
  Timer,
  Trash2,
  Trophy,
  Upload,
  Volume2,
  VolumeX,
} from "lucide-react";

type QuestionType = "truth" | "dare";
type GameMode = "classic" | "random" | "challenge";
type Stage = "landing" | "setup" | "play" | "finish";
type Result = "completed" | "skipped" | "failed";

type Player = { id: string; name: string; score: number; completed: number; skipped: number; failed: number };
type Question = { id: string; type: QuestionType; text: string; difficulty?: "normal" | "hard" };
type Pack = { id: string; name: string; createdAt: string; questions: Question[] };
type Turn = { id: string; playerName: string; type: QuestionType; question: string; result: Result; points: number; at: string };

type GameState = {
  roomId: string;
  gameName: string;
  stage: Stage;
  mode: GameMode;
  players: Player[];
  packs: Pack[];
  selectedPackIds: string[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  usedTruthIds: string[];
  usedDareIds: string[];
  lastAutoType: QuestionType;
  history: Turn[];
  sound: boolean;
  timerRunning: boolean;
  timerDuration: number;
  timerEndsAt: string | null;
  timerExpired: boolean;
};

type OnlineRoom = {
  enabled: boolean;
  roomId: string;
  status: "local" | "creating" | "joining" | "connected" | "saving" | "offline" | "error";
  role: "local" | "host" | "guest";
  error: string;
};

type DareDeckRoomRecord = {
  room_id: string;
  state: GameState;
  updated_at: string;
};

const storageKey = "khophi-truth-or-dare:v1";

const defaultQuestions: Question[] = [
  { id: "t-default-1", type: "truth", text: "What is one thing you are proud of but rarely talk about?" },
  { id: "t-default-2", type: "truth", text: "What is the funniest mistake you have made in public?" },
  { id: "t-default-3", type: "truth", text: "Who in this room would survive best in a crisis, and why?" },
  { id: "t-default-4", type: "truth", text: "What is a habit you want to improve this year?" },
  { id: "t-default-5", type: "truth", text: "What is a harmless secret talent you have?" },
  { id: "d-default-1", type: "dare", text: "Give a dramatic 20-second speech about why your phone deserves respect." },
  { id: "d-default-2", type: "dare", text: "Do your best slow-motion action movie walk across the room." },
  { id: "d-default-3", type: "dare", text: "Compliment every player in one sentence each." },
  { id: "d-default-4", type: "dare", text: "Sing the chorus of any song for 20 seconds.", difficulty: "hard" },
  { id: "d-default-5", type: "dare", text: "Act like a news reporter describing the current game for 30 seconds.", difficulty: "hard" },
];

const defaultPack: Pack = {
  id: "default-party-pack",
  name: "Default Party Pack",
  createdAt: new Date("2026-07-13T00:00:00.000Z").toISOString(),
  questions: defaultQuestions,
};

function id(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;
}

function createInitialState(): GameState {
  return {
    roomId: "room-local-default",
    gameName: "DareDeck Session",
    stage: "landing",
    mode: "classic",
    players: [createPlayer("KhophiSnow", "player-khophi"), createPlayer("Guest", "player-guest")],
    packs: [defaultPack],
    selectedPackIds: [defaultPack.id],
    currentPlayerIndex: 0,
    currentQuestion: null,
    usedTruthIds: [],
    usedDareIds: [],
    lastAutoType: "dare",
    history: [],
    sound: false,
    timerRunning: false,
    timerDuration: 0,
    timerEndsAt: null,
    timerExpired: false,
  };
}

function createPlayer(name = "", playerId = id("player")): Player {
  return { id: playerId, name, score: 0, completed: 0, skipped: 0, failed: 0 };
}

function pointsFor(question: Question, result: Result, mode: GameMode) {
  if (question.type === "truth") {
    if (result === "completed") return 5;
    if (result === "skipped") return -2;
    return -5;
  }
  if (result === "completed") return mode === "challenge" && question.difficulty === "hard" ? 15 : 10;
  if (result === "skipped") return -5;
  return -10;
}

function parseImportedQuestions(raw: string, fileName = "Custom Pack"): Pack {
  const content = raw.trim();
  if (!content) throw new Error("The uploaded file is empty.");

  const questions: Question[] = [];
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith(".json") || content.startsWith("{")) {
    const parsed = JSON.parse(content) as { truths?: string[]; dares?: string[] };
    if (!Array.isArray(parsed.truths) && !Array.isArray(parsed.dares)) throw new Error("JSON must include truths and/or dares arrays.");
    parsed.truths?.forEach((text, index) => questions.push({ id: id(`truth-json-${index}`), type: "truth", text: String(text).trim() }));
    parsed.dares?.forEach((text, index) => questions.push({ id: id(`dare-json-${index}`), type: "dare", text: String(text).trim() }));
  } else if (lowerName.endsWith(".csv") || content.toLowerCase().startsWith("type,question")) {
    const rows = content.split(/\r?\n/).filter(Boolean);
    const body = rows[0].toLowerCase().includes("type") ? rows.slice(1) : rows;
    for (const [index, row] of body.entries()) {
      const comma = row.indexOf(",");
      if (comma === -1) throw new Error("CSV rows must use Type,Question format.");
      const type = row.slice(0, comma).trim().toLowerCase();
      const text = row.slice(comma + 1).trim().replace(/^"|"$/g, "");
      if (type !== "truth" && type !== "dare") throw new Error(`CSV row ${index + 2} has an invalid type.`);
      if (text) questions.push({ id: id(`${type}-csv-${index}`), type: type as QuestionType, text });
    }
  } else {
    let active: QuestionType | null = null;
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (/^truth:?$/i.test(trimmed)) { active = "truth"; continue; }
      if (/^dare:?$/i.test(trimmed)) { active = "dare"; continue; }
      if (!active) throw new Error("TXT files must start with TRUTH: or DARE: sections.");
      questions.push({ id: id(`${active}-txt`), type: active, text: trimmed });
    }
  }

  const clean = questions.filter((question) => question.text.length > 2);
  if (!clean.some((question) => question.type === "truth") || !clean.some((question) => question.type === "dare")) {
    throw new Error("A pack needs at least one truth and one dare.");
  }

  return { id: id("pack"), name: fileName.replace(/\.[^.]+$/, "") || "Custom Pack", createdAt: new Date().toISOString(), questions: clean };
}

function sampleTemplate(type: "json" | "csv" | "txt") {
  if (type === "json") return '{\n  "truths": ["What is your biggest fear?"],\n  "dares": ["Sing for 30 seconds"]\n}';
  if (type === "csv") return 'Type,Question\nTruth,What is your biggest fear?\nDare,Sing for 30 seconds';
  return 'TRUTH:\nWhat is your biggest fear?\n\nDARE:\nSing for 30 seconds';
}

type TimerPatch = Pick<GameState, "timerRunning" | "timerDuration" | "timerEndsAt" | "timerExpired">;

function createDareTimerPatch(seconds = 30): TimerPatch {
  return { timerRunning: true, timerDuration: seconds, timerEndsAt: new Date(Date.now() + seconds * 1000).toISOString(), timerExpired: false };
}

function clearTimerPatch(): TimerPatch {
  return { timerRunning: false, timerDuration: 0, timerEndsAt: null, timerExpired: false };
}

function expireTimerPatch(): TimerPatch {
  return { timerRunning: false, timerDuration: 0, timerEndsAt: null, timerExpired: true };
}

function timerRemainingSeconds(state: GameState, now: number) {
  if (!state.timerRunning || !state.timerEndsAt) return state.timerDuration;
  return Math.max(0, Math.ceil((Date.parse(state.timerEndsAt) - now) / 1000));
}

export function TruthOrDareApp({ initialStage = "landing" }: { initialStage?: Stage } = {}) {
  const [state, setState] = useState<GameState>(() => ({ ...createInitialState(), stage: initialStage }));
  const [importError, setImportError] = useState("");
  const [importPreview, setImportPreview] = useState<Pack | null>(null);
  const [sessionText, setSessionText] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const [copyNotice, setCopyNotice] = useState("");
  const [onlineRoom, setOnlineRoom] = useState<OnlineRoom>({ enabled: false, roomId: "", status: "local", role: "local", error: "" });
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const appRef = useRef<HTMLElement>(null);
  const restored = useRef(false);
  const saveReady = useRef(false);
  const onlineRoomRef = useRef(onlineRoom);
  const applyingRemoteState = useRef(false);
  const onlineSyncTimer = useRef<number | null>(null);
  const lastOnlineState = useRef("");

  useEffect(() => {
    appRef.current?.setAttribute("data-hydrated", "true");
  }, []);

  useEffect(() => {
    onlineRoomRef.current = onlineRoom;
  }, [onlineRoom]);

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    const isE2E = Boolean((window as typeof window & { __KHOPHISNOW_E2E__?: boolean }).__KHOPHISNOW_E2E__);
    const saved = isE2E ? null : window.localStorage.getItem(storageKey);
    window.queueMicrotask(() => {
      try {
        if (saved) setState({ ...createInitialState(), ...JSON.parse(saved) });
      } catch {
        window.localStorage.removeItem(storageKey);
      } finally {
        saveReady.current = true;
      }
    });
  }, []);

  useEffect(() => {
    if (!saveReady.current) return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!state.timerRunning) return;
    const interval = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(interval);
  }, [state.timerRunning, state.timerEndsAt]);

  const activeQuestions = useMemo(() => state.packs.filter((pack) => state.selectedPackIds.includes(pack.id)).flatMap((pack) => pack.questions), [state.packs, state.selectedPackIds]);
  const currentPlayer = state.players[state.currentPlayerIndex] || state.players[0];
  const onlineInviteUrl = typeof window === "undefined" ? `/truth-or-dare?online=1&room=${onlineRoom.roomId || state.roomId}` : `${window.location.origin}/truth-or-dare?online=1&room=${onlineRoom.roomId || state.roomId}`;
  const localInviteUrl = typeof window === "undefined" ? `/truth-or-dare?room=${state.roomId}` : `${window.location.origin}/truth-or-dare?room=${state.roomId}`;
  const inviteUrl = onlineRoom.enabled ? onlineInviteUrl : localInviteUrl;
  const rankings = [...state.players].sort((a, b) => b.score - a.score);
  const timerRemaining = timerRemainingSeconds(state, now);

  const queueOnlineSync = useCallback((nextState: GameState) => {
    const room = onlineRoomRef.current;
    if (!supabase || !room.enabled || applyingRemoteState.current) return;
    const payloadState = { ...nextState, roomId: room.roomId };
    const serialized = JSON.stringify(payloadState);
    if (serialized === lastOnlineState.current) return;
    if (onlineSyncTimer.current) window.clearTimeout(onlineSyncTimer.current);
    setOnlineRoom((value) => ({ ...value, status: "saving", error: "" }));
    onlineSyncTimer.current = window.setTimeout(async () => {
      const { error } = await supabase.from("daredeck_rooms").upsert({ room_id: room.roomId, state: payloadState, updated_at: new Date().toISOString() });
      if (error) {
        setOnlineRoom((value) => ({ ...value, status: "error", error: error.message }));
        return;
      }
      lastOnlineState.current = serialized;
      setOnlineRoom((value) => ({ ...value, status: "connected", error: "" }));
    }, 450);
  }, [supabase]);

  const commitState = useCallback((nextOrUpdater: GameState | ((value: GameState) => GameState)) => {
    setState((value) => {
      const next = typeof nextOrUpdater === "function" ? nextOrUpdater(value) : nextOrUpdater;
      queueOnlineSync(next);
      return next;
    });
  }, [queueOnlineSync]);

  const update = useCallback((patch: Partial<GameState>) => commitState((value) => ({ ...value, ...patch })), [commitState]);

  useEffect(() => {
    if (!state.timerRunning || !state.timerEndsAt || timerRemaining > 0 || state.currentQuestion?.type !== "dare") return;
    const timeout = window.setTimeout(() => {
      commitState((value) => {
        if (!value.timerRunning || value.currentQuestion?.type !== "dare") return value;
        return { ...value, ...expireTimerPatch() };
      });
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [commitState, state.currentQuestion?.type, state.timerEndsAt, state.timerRunning, timerRemaining]);
  const playSound = () => {
    if (!state.sound || typeof window === "undefined") return;
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.frequency.value = 640;
    gain.gain.value = 0.035;
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.08);
  };

  const startGame = () => {
    commitState((value) => {
      const players = value.players.map((player) => ({ ...player, name: player.name.trim() })).filter((player) => player.name);
      if (players.length < 2) return value;
      return { ...value, stage: "play", players, currentPlayerIndex: 0, currentQuestion: null, history: [], usedTruthIds: [], usedDareIds: [], ...clearTimerPatch() };
    });
    playSound();
  };

  const chooseQuestion = (forcedType?: QuestionType) => {
    const playerTurns = state.history.filter((turn) => turn.playerName === currentPlayer?.name);
    const playerTruths = playerTurns.filter((turn) => turn.type === "truth").length;
    const playerDares = playerTurns.filter((turn) => turn.type === "dare").length;
    const lastForPlayer = playerTurns[0]?.type;
    const drawType = (): QuestionType => {
      if (forcedType) return forcedType;
      if (Math.abs(playerTruths - playerDares) >= 2) return playerTruths > playerDares ? "dare" : "truth";
      if (lastForPlayer && Math.random() < 0.65) return lastForPlayer === "truth" ? "dare" : "truth";
      if (state.mode === "challenge" && Math.random() < 0.62) return "dare";
      return Math.random() > 0.5 ? "truth" : "dare";
    };
    const type = drawType();
    const used = type === "truth" ? state.usedTruthIds : state.usedDareIds;
    const pool = activeQuestions.filter((question) => question.type === type);
    const available = pool.filter((question) => !used.includes(question.id));
    const finalPool = available.length ? available : pool;
    const selected = finalPool[Math.floor(Math.random() * finalPool.length)];
    if (!selected) return;
    const resetPatch = available.length ? {} : type === "truth" ? { usedTruthIds: [] } : { usedDareIds: [] };
    update({ ...resetPatch, currentQuestion: selected, lastAutoType: type, ...(selected.type === "dare" ? createDareTimerPatch(30) : clearTimerPatch()), ...(type === "truth" ? { usedTruthIds: [...(available.length ? state.usedTruthIds : []), selected.id] } : { usedDareIds: [...(available.length ? state.usedDareIds : []), selected.id] }) });
    setNow(Date.now());
    playSound();
  };

  const markResult = (result: Result) => {
    if (!state.currentQuestion || !currentPlayer) return;
    const points = pointsFor(state.currentQuestion, result, state.mode);
    const turn: Turn = { id: id("turn"), playerName: currentPlayer.name, type: state.currentQuestion.type, question: state.currentQuestion.text, result, points, at: new Date().toISOString() };
    const players = state.players.map((player) => player.id === currentPlayer.id ? { ...player, score: player.score + points, completed: player.completed + (result === "completed" ? 1 : 0), skipped: player.skipped + (result === "skipped" ? 1 : 0), failed: player.failed + (result === "failed" ? 1 : 0) } : player);
    update({ players, history: [turn, ...state.history].slice(0, 60), currentPlayerIndex: (state.currentPlayerIndex + 1) % players.length, currentQuestion: null, ...clearTimerPatch() });
    playSound();
  };

  const addPlayer = () => update({ players: [...state.players, createPlayer(`Player ${state.players.length + 1}`)] });
  const movePlayer = (from: number, direction: -1 | 1) => {
    const to = from + direction;
    if (to < 0 || to >= state.players.length) return;
    const players = [...state.players];
    [players[from], players[to]] = [players[to], players[from]];
    update({ players });
  };

  const handlePackFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setImportError("");
    setImportPreview(null);
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setImportPreview(parseImportedQuestions(await file.text(), file.name));
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Could not import that file.");
    }
  };

  const acceptPack = () => {
    if (!importPreview) return;
    update({ packs: [...state.packs, importPreview], selectedPackIds: [...state.selectedPackIds, importPreview.id] });
    setImportPreview(null);
  };

  const exportSession = () => setSessionText(JSON.stringify({ ...state, stage: "setup", currentQuestion: null, ...clearTimerPatch() }, null, 2));
  const importSession = () => {
    try {
      const parsed = JSON.parse(sessionText) as GameState;
      if (!Array.isArray(parsed.players) || !Array.isArray(parsed.packs)) throw new Error();
      commitState({ ...createInitialState(), ...parsed, currentQuestion: null, ...clearTimerPatch() });
      setImportError("");
    } catch {
      setImportError("Session import failed. Paste a valid exported game session.");
    }
  };

  const resetAll = () => commitState({ ...createInitialState(), roomId: id("room"), players: [createPlayer("KhophiSnow"), createPlayer("Guest")] });

  const connectOnlineRoom = useCallback(async (roomId: string) => {
    if (!supabase) {
      setOnlineRoom({ enabled: false, roomId: "", status: "offline", role: "local", error: "Supabase is not configured for online rooms yet." });
      return;
    }
    const cleanRoomId = roomId.trim();
    if (!cleanRoomId) return;
    setOnlineRoom({ enabled: false, roomId: cleanRoomId, status: "joining", role: "guest", error: "" });
    const { data, error } = await supabase.from("daredeck_rooms").select("room_id,state,updated_at").eq("room_id", cleanRoomId).maybeSingle<DareDeckRoomRecord>();
    if (error || !data?.state) {
      setOnlineRoom({ enabled: false, roomId: cleanRoomId, status: "error", role: "guest", error: error?.message || "Online room not found." });
      return;
    }
    applyingRemoteState.current = true;
    const nextState = { ...createInitialState(), ...data.state, roomId: cleanRoomId };
    lastOnlineState.current = JSON.stringify(nextState);
    setState(nextState);
    setOnlineRoom({ enabled: true, roomId: cleanRoomId, status: "connected", role: "guest", error: "" });
    window.queueMicrotask(() => { applyingRemoteState.current = false; });
  }, [supabase]);

  const createOnlineRoom = async () => {
    if (!supabase) {
      setOnlineRoom({ enabled: false, roomId: "", status: "offline", role: "local", error: "Add Supabase URL and publishable key to enable online rooms." });
      return;
    }
    const roomId = id("room");
    const nextState = { ...state, roomId };
    setOnlineRoom({ enabled: false, roomId, status: "creating", role: "host", error: "" });
    const { error } = await supabase.from("daredeck_rooms").upsert({ room_id: roomId, state: nextState, updated_at: new Date().toISOString() });
    if (error) {
      setOnlineRoom({ enabled: false, roomId, status: "error", role: "host", error: error.message });
      return;
    }
    lastOnlineState.current = JSON.stringify(nextState);
    setState(nextState);
    setOnlineRoom({ enabled: true, roomId, status: "connected", role: "host", error: "" });
    window.history.replaceState(null, "", `/truth-or-dare?online=1&room=${roomId}`);
  };

  const leaveOnlineRoom = () => {
    setOnlineRoom({ enabled: false, roomId: "", status: "local", role: "local", error: "" });
    lastOnlineState.current = "";
    if (typeof window !== "undefined") window.history.replaceState(null, "", "/truth-or-dare");
  };

  useEffect(() => {
    if (!supabase || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get("room");
    const wantsOnline = params.get("online") === "1";
    if (!roomId || !wantsOnline || onlineRoomRef.current.enabled || onlineRoomRef.current.status === "joining") return;
    void connectOnlineRoom(roomId);
  }, [connectOnlineRoom, supabase]);

  useEffect(() => {
    if (!supabase || !onlineRoom.enabled || !onlineRoom.roomId) return;
    const channel = supabase
      .channel(`daredeck-room-${onlineRoom.roomId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "daredeck_rooms", filter: `room_id=eq.${onlineRoom.roomId}` }, (payload) => {
        const record = payload.new as Partial<DareDeckRoomRecord>;
        if (!record.state) return;
        const nextState = { ...createInitialState(), ...record.state, roomId: onlineRoom.roomId };
        const serialized = JSON.stringify(nextState);
        if (serialized === lastOnlineState.current) return;
        applyingRemoteState.current = true;
        lastOnlineState.current = serialized;
        setState(nextState);
        setOnlineRoom((value) => ({ ...value, status: "connected", error: "" }));
        window.queueMicrotask(() => { applyingRemoteState.current = false; });
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setOnlineRoom((value) => ({ ...value, status: "connected", error: "" }));
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setOnlineRoom((value) => ({ ...value, status: "error", error: "Realtime connection interrupted." }));
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [onlineRoom.enabled, onlineRoom.roomId, supabase]);


  const copyInviteLink = async () => {
    try {
      await navigator.clipboard?.writeText(inviteUrl);
      setCopyNotice("Invite link copied");
      window.setTimeout(() => setCopyNotice(""), 2200);
    } catch {
      setCopyNotice("Copy failed. Select the link manually.");
    }
  };

  return (
    <main ref={appRef} data-testid="truth-dare-app" data-hydrated="false" className="scanline min-h-screen bg-ink text-white">
      <div className="cyber-grid pointer-events-none absolute inset-x-0 top-0 h-[720px]" />
      <header className="relative z-10 border-b border-white/10 bg-ink/88 text-white backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 lg:px-8">
          <Link href="/#case-files" className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white"><ArrowLeft size={16} />Back to case files</Link>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => update({ sound: !state.sound })} className="border border-white/12 px-3 py-2 text-xs font-bold text-white/70 hover:border-mint hover:text-mint">{state.sound ? <Volume2 className="mr-2 inline" size={14} /> : <VolumeX className="mr-2 inline" size={14} />}Sound</button>
          </div>
        </nav>
      </header>

      {state.stage === "landing" && <Landing onStart={() => update({ stage: "setup" })} />}
      {state.stage === "setup" && <Setup state={state} activeQuestions={activeQuestions} inviteUrl={inviteUrl} update={update} addPlayer={addPlayer} movePlayer={movePlayer} handlePackFile={handlePackFile} importError={importError} importPreview={importPreview} acceptPack={acceptPack} startGame={startGame} exportSession={exportSession} importSession={importSession} sessionText={sessionText} setSessionText={setSessionText} resetAll={resetAll} onlineRoom={onlineRoom} onlineAvailable={Boolean(supabase)} copyNotice={copyNotice} createOnlineRoom={createOnlineRoom} leaveOnlineRoom={leaveOnlineRoom} copyInviteLink={copyInviteLink} />}
      {state.stage === "play" && <PlayStage state={state} currentPlayer={currentPlayer} rankings={rankings} activeQuestions={activeQuestions} chooseQuestion={chooseQuestion} markResult={markResult} timer={timerRemaining} timerRunning={state.timerRunning} toggleTimer={() => update(state.timerRunning ? { timerRunning: false, timerDuration: timerRemaining, timerEndsAt: null, timerExpired: false } : { timerRunning: true, timerDuration: timerRemaining || 30, timerEndsAt: new Date(Date.now() + (timerRemaining || 30) * 1000).toISOString(), timerExpired: false })} finish={() => update({ stage: "finish" })} />}
      {state.stage === "finish" && <Finish rankings={rankings} restart={() => update({ stage: "setup", currentQuestion: null, currentPlayerIndex: 0, ...clearTimerPatch() })} resetAll={resetAll} />}
    </main>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return <section className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"><div><p className="font-mono text-sm uppercase text-mint">Portfolio game product</p><h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">DareDeck turns Truth and Dare into a real product.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">Create local rooms, import custom packs, run timed dares, track points, and export sessions. It is offline-first, and Supabase online rooms let invited players share the same game state.</p><div className="mt-8 flex flex-wrap gap-3"><button type="button" data-testid="truth-dare-open-setup" onClick={onStart} className="inline-flex items-center gap-2 bg-mint px-5 py-3 font-bold text-ink hover:bg-white"><Play size={18} />Start game</button><a href="#architecture" className="inline-flex items-center gap-2 border border-white/18 px-5 py-3 font-bold text-white hover:border-cyan hover:text-cyan">View architecture</a></div></div><div className="panel-glow border border-mint/20 bg-panel/80 p-5"><div className="overflow-hidden border border-white/10 bg-black/35"><Image src="/images/truth-or-dare.png" alt="DareDeck game interface preview" width={1364} height={646} className="aspect-video w-full object-cover object-top" priority /></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><Feature icon={<UsersIcon />} title="Local room" text="Play locally with no accounts, or create an online invite room when Supabase is configured." /><Feature icon={<Upload size={20} />} title="Question packs" text="Import JSON, CSV, or TXT packs with validation and preview before use." /><Feature icon={<Trophy size={20} />} title="Scoring engine" text="Truths, dares, skips, failures, and challenge mode multipliers." /><Feature icon={<History size={20} />} title="Session memory" text="LocalStorage persistence, online room snapshots, history, export, and import." /></div></div></section>;
}

function UsersIcon() { return <Sparkles size={20} />; }
function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) { return <article className="border border-white/10 bg-black/25 p-5"><span className="text-mint">{icon}</span><h3 className="mt-4 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/58">{text}</p></article>; }

function Setup(props: { state: GameState; activeQuestions: Question[]; inviteUrl: string; update: (patch: Partial<GameState>) => void; addPlayer: () => void; movePlayer: (from: number, direction: -1 | 1) => void; handlePackFile: (event: ChangeEvent<HTMLInputElement>) => void; importError: string; importPreview: Pack | null; acceptPack: () => void; startGame: () => void; exportSession: () => void; importSession: () => void; sessionText: string; setSessionText: (value: string) => void; resetAll: () => void; onlineRoom: OnlineRoom; onlineAvailable: boolean; copyNotice: string; createOnlineRoom: () => void; leaveOnlineRoom: () => void; copyInviteLink: () => void }) {
  const { state, update } = props;
  return <section className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8"><SectionHeader eyebrow="Create room" title="Set up the session" text="Add players, choose a mode, select packs, then play locally or create an online room invite." /><div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"><div className="space-y-6"><Panel title="Game details"><label className="block"><span className="font-mono text-xs uppercase text-mint">Game name</span><input value={state.gameName} onChange={(event) => update({ gameName: event.target.value })} className="mt-2 w-full border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-mint" /></label><div className="mt-4 grid gap-3 sm:grid-cols-3">{(["classic", "random", "challenge"] as GameMode[]).map((mode) => <button key={mode} type="button" onClick={() => update({ mode })} className={`border px-4 py-3 text-left text-sm font-bold capitalize ${state.mode === mode ? "border-mint bg-mint text-ink" : "border-white/12 text-white/66 hover:border-mint"}`}>{mode}<span className="mt-1 block text-xs font-normal opacity-70">{mode === "classic" ? "manual choice" : mode === "random" ? "system choice" : "hard dares score more"}</span></button>)}</div></Panel><Panel title="Players"><div className="space-y-3">{state.players.map((player, index) => <div key={player.id} className="grid gap-2 sm:grid-cols-[2rem_1fr_auto]"><span className="flex size-9 items-center justify-center border border-mint/25 bg-mint/10 font-mono text-xs text-mint">{index + 1}</span><input value={player.name} onChange={(event) => update({ players: state.players.map((item) => item.id === player.id ? { ...item, name: event.target.value } : item) })} className="border border-white/10 bg-black/35 px-3 py-2 text-white outline-none focus:border-mint" /><div className="flex gap-2"><button type="button" onClick={() => props.movePlayer(index, -1)} className="border border-white/10 px-2 text-white/60 hover:border-mint">↑</button><button type="button" onClick={() => props.movePlayer(index, 1)} className="border border-white/10 px-2 text-white/60 hover:border-mint">↓</button><button type="button" onClick={() => update({ players: state.players.filter((item) => item.id !== player.id) })} className="border border-red-300/20 px-2 text-red-200 hover:border-red-300"><Trash2 size={15} /></button></div></div>)}</div><button type="button" onClick={props.addPlayer} className="mt-4 inline-flex items-center gap-2 border border-mint/35 px-4 py-3 font-bold text-mint hover:bg-mint hover:text-ink"><Plus size={16} />Add player</button></Panel></div><div className="space-y-6"><Panel title="Question packs"><div className="grid gap-3">{state.packs.map((pack) => <label key={pack.id} className="flex items-start gap-3 border border-white/10 bg-black/25 p-4"><input type="checkbox" checked={state.selectedPackIds.includes(pack.id)} onChange={(event) => update({ selectedPackIds: event.target.checked ? [...state.selectedPackIds, pack.id] : state.selectedPackIds.filter((id) => id !== pack.id) })} className="mt-1" /><span className="flex-1"><span className="block font-bold text-white">{pack.name}</span><span className="text-xs text-white/45">{pack.questions.filter((q) => q.type === "truth").length} truths / {pack.questions.filter((q) => q.type === "dare").length} dares</span></span>{pack.id !== defaultPack.id && <button type="button" onClick={() => update({ packs: state.packs.filter((item) => item.id !== pack.id), selectedPackIds: state.selectedPackIds.filter((id) => id !== pack.id) })} className="text-red-200"><Trash2 size={16} /></button>}</label>)}</div><label className="mt-4 flex cursor-pointer items-center justify-center gap-2 border border-dashed border-mint/35 px-4 py-5 font-bold text-mint hover:bg-mint/10"><Import size={17} />Upload JSON, CSV, or TXT<input type="file" accept=".json,.csv,.txt" onChange={props.handlePackFile} className="sr-only" /></label>{props.importError && <p className="mt-3 border border-red-300/25 bg-red-500/10 p-3 text-sm text-red-100">{props.importError}</p>}{props.importPreview && <div className="mt-4 border border-cyan/25 bg-cyan/10 p-4"><p className="font-bold text-white">Preview: {props.importPreview.name}</p><p className="mt-2 text-xs text-white/60">{props.importPreview.questions.length} valid questions ready.</p><button type="button" onClick={props.acceptPack} className="mt-3 bg-mint px-4 py-2 font-bold text-ink">Add pack</button></div>}<div className="mt-4 grid gap-2 md:grid-cols-3">{(["json", "csv", "txt"] as const).map((type) => <details key={type} className="border border-white/10 bg-black/25 p-3"><summary className="cursor-pointer font-mono text-xs uppercase text-cyan">{type} template</summary><pre className="mt-3 whitespace-pre-wrap break-words text-[11px] leading-5 text-white/55">{sampleTemplate(type)}</pre></details>)}</div></Panel><Panel title="Room and session"><p className="text-sm text-white/58">Room ID: <span className="font-mono text-mint">{state.roomId}</span></p><div className="mt-4 border border-cyan/20 bg-cyan/10 p-4"><p className="font-mono text-xs uppercase text-cyan">Online room</p><p className="mt-2 text-sm leading-6 text-white/60">{props.onlineRoom.enabled ? `Live sync is active. You are the ${props.onlineRoom.role === "host" ? "host" : "guest"} for this room, and both screens update together.` : props.onlineAvailable ? "Create an online room when you want this session to sync across devices." : "Online rooms need Supabase environment variables."}</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={props.createOnlineRoom} disabled={!props.onlineAvailable || ["creating", "joining"].includes(props.onlineRoom.status)} className="border border-mint/35 px-3 py-2 text-sm font-bold text-mint hover:bg-mint hover:text-ink disabled:cursor-not-allowed disabled:opacity-40">{props.onlineRoom.enabled ? "Refresh online room" : "Create online room"}</button>{props.onlineRoom.enabled && <button type="button" onClick={props.leaveOnlineRoom} className="border border-white/12 px-3 py-2 text-sm font-bold text-white/62 hover:border-red-300 hover:text-red-200">Leave online</button>}</div><p className="mt-3 font-mono text-xs uppercase text-white/45">Status: <span className="text-mint">{props.onlineRoom.status}</span> / <span className="text-cyan">{props.onlineRoom.role}</span></p><p className="mt-2 text-xs leading-5 text-white/42">Online rooms are lightweight invite sessions. For now, create a fresh room for each game night.</p>{props.onlineRoom.error && <p className="mt-2 text-sm text-red-200">{props.onlineRoom.error}</p>}</div><button type="button" onClick={props.copyInviteLink} className="mt-3 inline-flex items-center gap-2 border border-white/12 px-3 py-2 text-sm text-white/70 hover:border-mint"><Clipboard size={15} />Copy {props.onlineRoom.enabled ? "online" : "local"} invite link</button>{props.copyNotice && <span className="ml-3 inline-flex border border-mint/25 bg-mint/10 px-3 py-2 text-xs font-bold text-mint">{props.copyNotice}</span>}<div className="mt-4 grid gap-3 sm:grid-cols-2"><button type="button" onClick={props.exportSession} className="border border-white/12 px-3 py-2 text-sm font-bold text-white/70 hover:border-cyan"><Download className="mr-2 inline" size={15} />Export</button><button type="button" onClick={props.importSession} className="border border-white/12 px-3 py-2 text-sm font-bold text-white/70 hover:border-cyan"><FileJson className="mr-2 inline" size={15} />Import pasted</button></div><textarea value={props.sessionText} onChange={(event) => props.setSessionText(event.target.value)} placeholder="Exported session JSON appears here. Paste one to import." className="mt-3 min-h-28 w-full border border-white/10 bg-black/35 p-3 font-mono text-xs text-cyan outline-none focus:border-mint" /></Panel></div></div><div className="mt-8 flex flex-wrap gap-3"><button type="button" data-testid="truth-dare-start-session" onClick={props.startGame} disabled={state.players.filter((p) => p.name.trim()).length < 2 || props.activeQuestions.length < 2} className="inline-flex items-center gap-2 bg-mint px-5 py-3 font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40"><Play size={18} />Start game</button><button type="button" onClick={props.resetAll} className="inline-flex items-center gap-2 border border-white/12 px-5 py-3 font-bold text-white/65 hover:border-red-300 hover:text-red-200"><RefreshCcw size={17} />Reset</button></div><ArchitectureBlock /></section>;
}

function PlayStage({ state, currentPlayer, rankings, activeQuestions, chooseQuestion, markResult, timer, timerRunning, toggleTimer, finish }: { state: GameState; currentPlayer: Player; rankings: Player[]; activeQuestions: Question[]; chooseQuestion: (type?: QuestionType) => void; markResult: (result: Result) => void; timer: number; timerRunning: boolean; toggleTimer: () => void; finish: () => void }) {
  return <section className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><SectionHeader eyebrow={state.mode} title={state.gameName} text={`${activeQuestions.length} active questions / ${state.history.length} turns played`} /><button type="button" onClick={finish} className="border border-amber/40 px-4 py-3 font-bold text-amber hover:bg-amber hover:text-ink">End game</button></div><div className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_0.28fr]"><div className="panel-glow border border-mint/20 bg-panel/85 p-5"><p className="font-mono text-xs uppercase text-cyan">Current turn</p><h2 className="mt-3 text-4xl font-black text-white md:text-6xl">{currentPlayer?.name}</h2>{!state.currentQuestion ? <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3"><button type="button" onClick={() => chooseQuestion("truth")} disabled={state.mode !== "classic"} className="border border-cyan/30 bg-cyan/10 p-5 text-left font-black text-cyan disabled:opacity-35">Truth</button><button type="button" onClick={() => chooseQuestion("dare")} disabled={state.mode !== "classic"} className="border border-red-300/30 bg-red-500/10 p-5 text-left font-black text-red-200 disabled:opacity-35">Dare</button><button type="button" data-testid="truth-dare-draw-question" onClick={() => chooseQuestion()} className="col-span-2 border border-mint/35 bg-mint/10 p-5 text-left font-black text-mint sm:col-span-1"><Shuffle className="mb-3" />Draw question</button></div> : <div className="mt-8 animate-[route-enter_420ms_ease_both] border border-white/10 bg-black/35 p-6"><p className="font-mono text-xs uppercase text-mint">{state.currentQuestion.type}{state.currentQuestion.difficulty === "hard" ? " / hard" : ""}</p><p className="mt-4 text-3xl font-black leading-tight text-white">{state.currentQuestion.text}</p>{state.currentQuestion.type === "dare" && <div className="mt-6 flex flex-wrap items-center gap-3"><span className={`inline-flex items-center gap-2 border px-4 py-3 font-mono text-xl ${state.timerExpired ? "border-red-300/35 text-red-200" : "border-white/10 text-amber"}`}><Timer size={20} />{timer}s</span><button type="button" onClick={toggleTimer} className="border border-amber/35 px-4 py-3 font-bold text-amber hover:bg-amber hover:text-ink">{timerRunning ? "Pause" : state.timerExpired ? "Restart timer" : "Start timer"}</button>{state.timerExpired && <span className="border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">Time up. The group should judge the result.</span>}</div>}<div className="mt-8 border border-white/10 bg-white/[0.03] p-4"><p className="font-mono text-xs uppercase text-white/45">Result decided by the group</p><div className="mt-3 grid gap-3 sm:grid-cols-3"><button type="button" onClick={() => markResult("completed")} className="bg-mint px-4 py-3 font-bold text-ink">Completed</button><button type="button" onClick={() => markResult("skipped")} className="border border-amber/35 px-4 py-3 font-bold text-amber hover:bg-amber hover:text-ink">Skipped</button><button type="button" onClick={() => markResult("failed")} className="border border-red-300/35 px-4 py-3 font-bold text-red-200 hover:bg-red-500/10">Failed</button></div></div></div>}</div><aside className="space-y-5"><Scoreboard rankings={rankings} /><Panel title="Turn history"><div className="max-h-80 space-y-3 overflow-auto pr-1">{state.history.slice(0, 8).map((turn) => <div key={turn.id} className="border border-white/10 bg-black/25 p-3 text-xs text-white/60"><p className="font-bold text-white">{turn.playerName} <span className={turn.points >= 0 ? "text-mint" : "text-red-200"}>{turn.points >= 0 ? "+" : ""}{turn.points}</span></p><p className="mt-1 capitalize text-cyan">{turn.type} / {turn.result}</p></div>)}</div></Panel></aside></div></section>;
}

function Finish({ rankings, restart, resetAll }: { rankings: Player[]; restart: () => void; resetAll: () => void }) {
  const winner = rankings[0];
  return <section className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-5xl items-center px-5 py-16 lg:px-8"><div className="absolute inset-x-0 top-24 flex justify-center overflow-hidden text-6xl opacity-40"><span className="animate-bounce">✦ ✧ ✦ ✧ ✦</span></div><div className="panel-glow relative w-full border border-mint/25 bg-panel/90 p-6 text-center"><PartyPopper className="mx-auto text-mint" size={44} /><p className="mt-5 font-mono text-xs uppercase text-cyan">Winner</p><h1 className="mt-3 text-5xl font-black text-white md:text-7xl">{winner?.name || "No winner"}</h1><p className="mt-4 text-2xl font-black text-mint">{winner?.score || 0} points</p><div className="mt-10 grid gap-3 md:grid-cols-3">{rankings.slice(0, 3).map((player, index) => <div key={player.id} className="border border-white/10 bg-black/25 p-4"><p className="font-mono text-xs text-amber">#{index + 1}</p><p className="mt-2 text-xl font-black text-white">{player.name}</p><p className="text-mint">{player.score} pts</p></div>)}</div><div className="mt-8 flex flex-wrap justify-center gap-3"><button type="button" onClick={restart} className="bg-mint px-5 py-3 font-bold text-ink">Play again</button><button type="button" onClick={resetAll} className="border border-white/12 px-5 py-3 font-bold text-white/70 hover:border-red-300">New room</button></div></div></section>;
}

function Scoreboard({ rankings }: { rankings: Player[] }) { return <Panel title="Scoreboard"><div className="space-y-3">{rankings.map((player, index) => <div key={player.id} className="flex items-center justify-between gap-3 border border-white/10 bg-black/25 p-3"><span><span className="font-mono text-xs text-cyan">#{index + 1}</span><span className="ml-3 font-bold text-white">{player.name}</span></span><span className="font-mono text-mint">{player.score}</span></div>)}</div></Panel>; }
function Panel({ title, children }: { title: string; children: ReactNode }) { return <section className="border border-white/10 bg-panel/75 p-5"><h2 className="font-mono text-sm uppercase text-mint">{title}</h2><div className="mt-5">{children}</div></section>; }
function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <div><p className="font-mono text-sm uppercase text-mint">{eyebrow}</p><h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-white/62">{text}</p></div>; }
function ArchitectureBlock() { return <section id="architecture" className="mt-14 border border-cyan/25 bg-cyan/10 p-5"><p className="font-mono text-xs uppercase text-cyan">Architecture</p><div className="mt-5 grid gap-4 md:grid-cols-5">{["Create room", "Players", "Packs", "Game engine", "Serializable state"].map((item, index) => <div key={item} className="border border-white/10 bg-black/25 p-4"><p className="font-mono text-xs text-mint">0{index + 1}</p><p className="mt-2 font-bold text-white">{item}</p></div>)}</div><p className="mt-5 text-sm leading-7 text-white/65">Storage uses localStorage for local play, while Supabase Realtime can mirror the serialized room state for invite-based online sessions. The same state shape keeps scores, history, questions, and dare timers consistent across players.</p></section>; }
