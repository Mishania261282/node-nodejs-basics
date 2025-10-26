import { Transform } from 'node:stream';
import process from 'node:process';
import { pipeline } from 'node:stream';


class ReverseTextTransform extends Transform {  
  _transform(chunk, encoding, callback) {
    const inputString = chunk.toString();
    const reversedChunk = inputString.split('').reverse().join('');    
    
    this.push(reversedChunk);     
    callback(); 
  }
}

const transform = () => {
  const reverseStream = new ReverseTextTransform();

  console.log('Please type text and press Enter.');

  pipeline(
    process.stdin,      
    reverseStream,      
    process.stdout,     
    (err) => {
      if (err) {
        console.error(`Pipeline failed: ${err.message}`);
        process.exit(1);
      } else {        
        process.exit(0);
      }
    }
  );
};

transform();