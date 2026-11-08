import { NetGraph } from '../graph/NetGraph';

export interface Command {
  execute(graph: NetGraph): void;
  undo(graph: NetGraph): void;
}

export class CommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  private maxHistory: number = 50;

  public execute(command: Command, graph: NetGraph): void {
    command.execute(graph);
    this.undoStack.push(command);
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    this.redoStack = []; // Clear redo stack on new action
  }

  public undo(graph: NetGraph): boolean {
    const cmd = this.undoStack.pop();
    if (!cmd) return false;
    cmd.undo(graph);
    this.redoStack.push(cmd);
    return true;
  }

  public redo(graph: NetGraph): boolean {
    const cmd = this.redoStack.pop();
    if (!cmd) return false;
    cmd.execute(graph);
    this.undoStack.push(cmd);
    return true;
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  public clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }
}
