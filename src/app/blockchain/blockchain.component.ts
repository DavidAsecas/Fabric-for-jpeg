import { Component } from '@angular/core';
import { FabricService } from '../service/fabric.service';

@Component({
    selector: 'pm-block',
    templateUrl: './blockchain.component.html'
})
export class BlockchainComponent {
    owner: string;
    channel: string;
    org: string;

    constructor(private fabricService: FabricService) { }

    queryOwnerFromImage(channel: string, org: string, image: string) {
        this.fabricService.queryOwner(channel, org, image)
            .subscribe(res => {
                console.log(res.queryResponse)
                this.owner = res.queryResponse;
            })
    }
    // createBlockchain() {
    //     // la manera de ir cambiando 'port' es provisional!!!
    //     let gethRequest: GethRequest = {
    //         request: "create",
    //         config: {
    //             networkid: 1114,
    //             port: 30303 + parseInt(this.datadir),
    //             // mine: '',
    //             // minerthreads: 1,
    //             datadir: this.path + this.datadir,
    //             ipcpath: 'geth-' + this.datadir + '.ipc'
    //         }
    //     }

    //     this.gethService.createBlockchain(gethRequest)
    //         .subscribe(res => {
    //             console.log(res.message);
    //         });
    // }

    
}