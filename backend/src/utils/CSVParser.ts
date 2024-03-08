import papa from 'papaparse';

export async function CSVParser(filePath:string){
    const csv = await Bun.readableStreamToText(Bun.file(filePath).stream());
    return new Promise((resolve)=>{
        papa.parse(csv,{
        header:true,
        complete:(result)=>{
            resolve(result.data);
        }
    })});
}