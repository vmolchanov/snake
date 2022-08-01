import WelcomeView from './views/welcome-view';
import ModeView from './views/mode-view';
import GameView from './views/game-view';

export const routes = [
  {
    exact: true,
    path: '/',
    component: WelcomeView,
  },
  {
    exact: false,
    path: '/mode',
    component: ModeView,
  },
  {
    exact: false,
    path: '/game',
    component: GameView,
  },
];
