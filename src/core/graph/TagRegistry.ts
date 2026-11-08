import { DeviceComponent } from '../types/circuit';

export interface TagEntry {
  tag: string;
  type: string;
  componentId: string;
  isMaster: boolean;
  dependentComponentIds: string[];
}

export class TagRegistry {
  private tags: Map<string, TagEntry> = new Map();

  public rebuild(components: DeviceComponent[]): void {
    this.tags.clear();

    // 1. First pass: find all master devices (coils, overloads, timers, breakers)
    for (const comp of components) {
      const isMaster = [
        'contactor_coil',
        'control_relay_coil',
        'timer_on_delay',
        'timer_off_delay',
        'timer_flasher',
        'timer_star_delta',
        'overload_relay',
        'mcb_3p',
        'mcb_1p'
      ].includes(comp.type);

      if (isMaster && comp.tag) {
        this.tags.set(comp.tag, {
          tag: comp.tag,
          type: comp.type,
          componentId: comp.id,
          isMaster: true,
          dependentComponentIds: []
        });
      }
    }

    // 2. Second pass: map dependent contacts
    for (const comp of components) {
      if (comp.masterTag && this.tags.has(comp.masterTag)) {
        const entry = this.tags.get(comp.masterTag)!;
        entry.dependentComponentIds.push(comp.id);
      }
    }
  }

  public getMasterTags(): string[] {
    return Array.from(this.tags.keys()).sort();
  }

  public getEntry(tag: string): TagEntry | undefined {
    return this.tags.get(tag);
  }

  public getDependents(tag: string): string[] {
    return this.tags.get(tag)?.dependentComponentIds || [];
  }
}
