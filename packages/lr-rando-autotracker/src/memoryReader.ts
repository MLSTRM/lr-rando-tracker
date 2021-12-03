import memoryjs, { DataTypes, Process } from "memoryjs";

const LRProcess = "LRFF13.exe";

export class LrMemoryReader {
    private processObject: Process | undefined;
    private debug: boolean;

    constructor(debug = false){
        this.debug = debug;
    }
    

    tryAttach(): boolean {
        this.processObject = memoryjs.openProcess(LRProcess);
        if(this.debug){
            console.log(JSON.stringify(this.processObject));
        }
        return !!this.processObject.szExeFile;
    }

    isAttached(): boolean {
        return !!this.processObject?.szExeFile;
    }

    readMemoryAddress(offset: number, dataType: DataTypes, absolute = false): any {
        if(!this.processObject){
            return undefined;
        }
        if(this.debug){
            console.log(JSON.stringify({
                base: this.processObject.modBaseAddr.toString(16),
                offset: offset.toString(16),
                absolute
            }));
        }
        const address = absolute ? offset : this.processObject.modBaseAddr + offset;
        return memoryjs.readMemory(this.processObject.handle, address, dataType);
    }

    readBuffer(offset: number, length: number, absolute = false): Buffer {
        if(!this.processObject){
            return Buffer.from('');
        }
        if(this.debug){
            console.log(JSON.stringify({
                base: this.processObject.modBaseAddr.toString(16),
                offset: offset.toString(16),
                absolute
            }));
        }
        const address = absolute ? offset : this.processObject.modBaseAddr + offset;
        return memoryjs.readBuffer(this.processObject.handle, address, length);
    }

    getModules(){
        console.log(JSON.stringify(memoryjs.getModules(this.processObject?.th32ProcessID).map(m => m.szModule)));
    }

    detatch(): void {
        this.processObject = undefined;
    }
}