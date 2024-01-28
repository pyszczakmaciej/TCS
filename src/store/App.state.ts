import { signal } from "@preact/signals-react";
import { IAppState } from "./models/app-state.interface";
import { UnpackSignal } from "./models/unpack-signal.type";

const AppStoreState: IAppState = {
  user: signal(null),
  tests: signal([]),
  token: signal(null),
  questionToEdit: signal(null),

  apiUrl: signal("http://localhost:8080"),
};

const setValue = <K extends keyof IAppState>(
  key: K,
  value: UnpackSignal<IAppState[K]>
): void => {
  AppStoreState[key].value = value;
};

const getValue = <K extends keyof IAppState>(
  key: K
): UnpackSignal<IAppState[K]> => {
  return AppStoreState[key].value as UnpackSignal<IAppState[K]>;
};

const AppState = {
  setValue,
  getValue,
};

export default AppState;
