export const HARBOR_TEMPLATE: Record<string, TemplateHarbor> = {
  "0,-2,2": { resource: null, ratio: 3, vertices: ["TOP_LEFT", "TOP"] },
  "1,-2,1": { resource: "grain", ratio: 2, vertices: ["TOP", "TOP_RIGHT"] },
  "2,-1,-1": { resource: "ore", ratio: 2, vertices: ["TOP", "TOP_RIGHT"] },
  "2,0,-2": {
    resource: null,
    ratio: 3,
    vertices: ["TOP_RIGHT", "BOTTOM_RIGHT"],
  },
  "1,1,-2": {
    resource: "wool",
    ratio: 2,
    vertices: ["BOTTOM_RIGHT", "BOTTOM"],
  },
  "-1,2,-1": {
    resource: null,
    ratio: 3,
    vertices: ["BOTTOM", "BOTTOM_RIGHT"],
  },
  "-2,2,0": {
    resource: null,
    ratio: 3,
    vertices: ["BOTTOM", "BOTTOM_LEFT"],
  },
  "-2,1,1": {
    resource: "brick",
    ratio: 2,
    vertices: ["BOTTOM_LEFT", "TOP_LEFT"],
  },
  "-1,-1,2": {
    resource: "lumber",
    ratio: 2,
    vertices: ["TOP_LEFT", "BOTTOM_LEFT"],
  },
};
