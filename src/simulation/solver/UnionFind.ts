/**
 * High-performance Disjoint-Set / Union-Find with path compression & rank heuristic.
 * Used to group all connected electrical nodes (terminals, junctions, closed switches, wires)
 * into equipotential conductive sets in near O(1) amortized time.
 */
export class UnionFind {
  private parent: Map<string, string> = new Map();
  private rank: Map<string, number> = new Map();

  public makeSet(x: string): void {
    if (!this.parent.has(x)) {
      this.parent.set(x, x);
      this.rank.set(x, 0);
    }
  }

  public find(x: string): string {
    if (!this.parent.has(x)) {
      this.makeSet(x);
      return x;
    }
    let p = this.parent.get(x)!;
    if (p !== x) {
      p = this.find(p);
      this.parent.set(x, p); // Path compression
    }
    return p;
  }

  public union(x: string, y: string): string {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return rootX;

    const rankX = this.rank.get(rootX) || 0;
    const rankY = this.rank.get(rootY) || 0;

    if (rankX < rankY) {
      this.parent.set(rootX, rootY);
      return rootY;
    } else if (rankX > rankY) {
      this.parent.set(rootY, rootX);
      return rootX;
    } else {
      this.parent.set(rootY, rootX);
      this.rank.set(rootX, rankX + 1);
      return rootX;
    }
  }

  public getAllSets(): Map<string, string[]> {
    const sets = new Map<string, string[]>();
    for (const key of this.parent.keys()) {
      const root = this.find(key);
      if (!sets.has(root)) {
        sets.set(root, []);
      }
      sets.get(root)!.push(key);
    }
    return sets;
  }
}
