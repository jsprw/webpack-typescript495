(async function () {
  const files = ["import1.ts", "import2.ts", "import3.ts"];

  const imports = await Promise.all(
    files.map((file) => import(`./dynamic-imports/${file}`))
  );

  // this should log an array of objects
  // in typescript 4.9.5 on node v16.15.0, this will throw an MODULE_NOT_FOUND error
  console.log(imports);
})();
