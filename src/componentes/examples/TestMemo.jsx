import { memo, useState } from 'react';

const TestMemo = memo(({myValue}) => {
  console.log("This is an example for a Memo: " + myValue);
  return <div>{myValue}</div>;
});

function TestDisplay({id, myArray}) {
  //We take in the id as the crypto.randomUUID because
  //It doesn't seem to work when declaring it here.
  let content = [];
  let idCount = 0;
  if (myArray) {
    myArray.forEach((number) => {
      content.push(<TestMemo key={id+idCount} myValue={number} />)
      idCount++;
    });
  }
  return <>{content}</>;
}

function MemoTest() {
  const [ testArray, setTestArray ] = useState([1,2,3]);
  function testCount() {
    setTestArray([0,2,3]);
  }

  return (
    <>
    <TestDisplay id={crypto.randomUUID} myArray={testArray} />
    <button onClick={testCount}>Try this memo update</button>
    </>
 ) 
};

export default MemoTest