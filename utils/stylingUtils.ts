export const getStylesForChamber = (title: string) => {
  if (title.startsWith("Bloodborn"))
    return {
      backgroundColorStyle: "bg-red-900",
      buttonColorStyle: "bg-red-900 hover:bg-red-800",
      dropdownColorStyle: "bg-red-900",
    };

  if (title.startsWith("Haunted"))
    return {
      backgroundColorStyle: "bg-cyan-900",
      buttonColorStyle: "bg-cyan-900 hover:bg-cyan-800",
      dropdownColorStyle: "bg-cyan-900",
    };

  if (title.startsWith("Reborn"))
    return {
      backgroundColorStyle: "bg-emerald-900",
      buttonColorStyle: "bg-emerald-900 hover:bg-emerald-800",
      dropdownColorStyle: "bg-emerald-900",
    };

  return {
    backgroundColorStyle: "bg-fuchsia-950",
    buttonColorStyle: "bg-fuchsia-950 hover:bg-fuchsia-900",
    dropdownColorStyle: "bg-fuchsia-950",
  };
};
