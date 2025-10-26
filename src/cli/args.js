const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = [];  

  for (let i = 0; i < args.length; i += 2) {
    const keyArg = args[i];
    const valueArg = args[i + 1];
    const propName = keyArg.substring(2);
    parsedArgs.push(`${propName} is ${valueArg}`);
  }
  const result = parsedArgs.join(", ");

  console.log(result);
};

parseArgs();
