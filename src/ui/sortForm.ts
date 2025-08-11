/**
 * Populates a select element with sorting options for student fields
 * @param select The select element to populate with options
 */
export function addSortAreas(select: HTMLSelectElement) {
  type selectOpt = { value: string; text: string };
  let options: selectOpt[] = [
    { value: "name", text: "Name" },
    { value: "age", text: "Age" },
    { value: "isActive", text: "Is Active" },
  ];
  let items = options.map((i) => {
    const option = document.createElement("option");
    option.value = i.value;
    option.text = i.text;
    return option;
  });
  select.replaceChildren(...[select.children[0]!, ...items]);
}
