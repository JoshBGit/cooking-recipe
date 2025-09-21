export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('chef').title("Chefs"),
      S.documentTypeListItem('recipe').title("Recipes"),
    ]);
