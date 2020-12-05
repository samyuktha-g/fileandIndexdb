class IndexDb {

    static async Open() {

        let fileHandle;

        [fileHandle] = await window.showOpenFilePicker();
        console.log("fileHandler:  ", fileHandle); // <-- "fileHandle" Returns the file name
        IndexDb.TextContent(fileHandle);
        return fileHandle;
    }

    static async TextContent(text) {
        const file = await text.getFile();
        const contents = await file.text();
        console.log("contents: ", contents);
        document.getElementById("here").innerText = contents;
        return file;
    }


    // ************************************ Creates a file ************************************//

    static CreateFile() {

        const handle = window.showSaveFilePicker();
        console.log("handle: ", handle);
        return handle;
    }

    //**********************************  Writes a File   ****************************************************** */


    //Upon clicking on the WriteFile button creates a table in indexedDB with table name as TExtEditorDB
    static async writeFile() {
        // async function() {
        let fileHandle;
        let index;
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const fileN = file.text();
        console.log("file in writefile:", file);

        //  console.log("fileHandler:  ", fileHandle); // <-- "fileHandle" Returns the file name

        //********************************Reads/Returns the contents of the file**************************************************** */
        // var text = IndexDb.TextContent(fileF);

        if (!'indexedDB' in window) {
            console.log(" your browser doesnt support indexDB");
            // return;
        }
        const databaseName = "TextEditorDB";
        const DBname = window.indexedDB.open(databaseName);
        DBname.onupgradeneeded = () => {
                let db = DBname.result;
                let store = db.createObjectStore("Files", { autoIncrement: true });
                // let store = db.createObjectStore("Files", { autoIncrement: true });
                index = store.createIndex("filename", "fileeName", { unique: false });
                console.log("index; ", index);
                // put method
                store.add(file);
            }
            // DBname.onsuccess = () => {
            //     if (DBname.readyState == "done") {
            //         console.log("Data is successfully loaded");
            //     }
            //     let db = DBname.result;
            //     let tx = db.transaction("Files", "readwrite");
            //     //let Objstore = tx.ObjectStore("Files");
            //     store.add(file);
            // }
        area.value = localStorage.getItem('area');
        area.oninput = () => {
            localStorage.setItem('area', area.value)
        };
    }

    //Local Storage which deletes/clears the text entered by user upon clikcing on clear button, can view the Keyvalue in localstorage with Key=area and value as text entered


    //     document.querySelector("#FileInput").addEventListener("change", function() {
    //         const reader = new FileReader();

    //         reader.addEventListener("load", () => {
    //             console.log(load, reader.result);
    //             localStorage.setItem("this-file", reader.result);
    //         });
    //         console.log("file: ", this.file[0]);
    //         reader.readAsDataURL(this.file[0]);
    //     });
    //     document.addEventListener("DOMContentLoaded", () => {
    //         const recentImageUrl = localStorage.getItem("this-file");
    //         console.log("recent", recentImageUrl);
    //     })

    // }

    // var butOpenFile = document.getElementById("btn");

}