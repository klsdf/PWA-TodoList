import { AppData } from '../AppData.js';

export abstract class Page {
    abstract onEnter(appData: AppData): void;
    abstract onLeave(): void;
}
