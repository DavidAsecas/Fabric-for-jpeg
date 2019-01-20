export interface GethRequest {
    request: string;
    config: Config;
}
export interface Config {
    networkid: number;
    port: number;
    // mine: string;
    // minerthreads: number;
    datadir: string;
    ipcpath: string;
}


