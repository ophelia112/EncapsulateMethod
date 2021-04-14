// var a = "abc";
// console.log(typeof JSON.stringify(a));//"abc"
// console.log(typeof JSON.stringify(null));//"null"
// console.log(typeof JSON.stringify(undefined));//undefined
// console.log(typeof JSON.stringify(""));//"
// console.log(typeof JSON.stringify(["a",1]));//["a":1]
// console.log(typeof JSON.stringify({a:1}));//{"a":1}
// console.log(JSON.stringify({2:1,a:3,name:123,b:NaN}));//{"a":1}
// console.log(JSON.stringify(true));//{"a":1}
// console.log(typeof a);
// console.log(ToJson(a));//"abc"
// console.log(ToJson(null));//"null"
// console.log(ToJson(undefined));//undefined
// console.log(ToJson(""));//"
// console.log(ToJson(["a",1]));//["a":1]
// console.log(ToJson({a:1}));//{"a":1}
// console.log(ToJson({2:1,a:3,name:123}));//{"2":1,"a":3,"name":123}
// console.log(ToJson(true));//{"a":1}
const SpecialType = ["function", "symbol", "undefined"];
function ChangeArray(item) {
    const itemType = typeof item;
    return (SpecialType.includes(itemType) || (isNaN(item) && itemType === "number")) ;//true or false        
}
function IsDropProp(item){
    return SpecialType.includes(typeof item);
}
function handleObject(item) {
    if(item ===null){
        return "null";
    }
    const data = item.valueOf();//除去包装类，得到原始的类，因为包装类例如 new Number(1),获得的是1，不是object类型
    if (typeof data != "object") {
        return ToJson(data);
    } 
    else if (data instanceof Array) {//数组类型
        return `[${
            data.
            map(
                (it) => (  ChangeArray(it) ? "null" : ToJson(it) )
            ).join(",")
        }]`;
    }
    const result = Object.entries(data)
    .flatMap(([k,v])=>(IsDropProp(v) ? [] : `"${k}":${ToJson(v)}`))
    .join(',');
    return `{${result}}`;
}

function ToJson(item) {
    const type = typeof item
    switch (type) {
        case "string":
            return `"${item}"`;
        case "boolean":
            return "" + item;
        case "bigint":
            return new Error("Do not know how to serialize a BigInt");
        case "number":
           if(!isNaN(item)){
            return ""+item;
           }else{
               return "null";
           }
        case "object":
            return handleObject(item);
        case "function":
        case "symbol":
        case "undefined":
            return;

    }
}
// console.log(JSON.stringify(() => { }));
// console.log(JSON.stringify(Symbol(1)));
// console.log(JSON.stringify(1));typeof ToJson(1n),ToJson(1n), 
// console.log(JSON.stringify([null, 1, "b", undefined, Symbol("1"), true, NaN, () => { }, {}]));
// console.log(ToJson([null, 1, "b", undefined, Symbol("1"), true, NaN, () => { }, {}]));
// console.log(JSON.stringify({a:1,b:2,c:"ab",d:true,e:NaN,f:()=>{},1:1}));
// console.log(ToJson({a:1,b:2,c:"ab",d:true,e:NaN,f:()=>{},1:1}));
// console.log(ToJson("aaa"),JSON.stringify("aaa"),"aaa");
console.log(
    ToJson({
      a: undefined,
      b: Symbol("1"),
      d: () => {},
      c: "abc",
      e: {
        a: 1,
        b: [{ name: "ophelia", age: 18 }, 44, {}],
      },
    })
  );
  console.log(
    JSON.stringify({
      a: undefined,
      b: Symbol("1"),
      d: () => {},
      c: "abc",
      e: {
        a: 1,
        b: [{ name: "ophelia", age: 18 }, 44, {}],
      },
    })
  );
  