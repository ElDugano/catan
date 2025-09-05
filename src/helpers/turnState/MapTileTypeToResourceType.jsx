export default function mapTileTypeToResourceType(landValue) {
  switch(landValue) {
    case "Pasture":
      return "Wool";
    case "Forest":
      return "Lumber";
    case "Fields":
      return "Grain";
    case "Hills":
      return "Brick";
    case "Mountains":
      return "Ore";
    case "Desert":
      return null;
  };
};