import type { UseVideoActions, VideoState } from "..";

type State = {
  state: VideoState;
  el: HTMLVideoElement | null;
};

type Actions = { actions: UseVideoActions };

type UIState = {
  uiState: {
    isFullscreen: boolean;
    showControls: boolean;
    isSeeking: boolean;
  };
};

type UIActions = {
  uiActions: {
    setIsSeeking: (value: boolean) => void;
    toggleFullscreen: () => Promise<void>;
    togglePiP: () => Promise<void>;
    scheduleHide: () => void;
    setShowControls: (value: boolean) => void;
  };
};

type Computed = {
  computed: {
    volumeValue: number;
    seekTime: number;
  };
};

type VideoPlayerContextValue = State & Actions & UIState & UIActions & Computed;

export type {
  State,
  Actions,
  UIState,
  UIActions,
  Computed,
  VideoPlayerContextValue,
};
