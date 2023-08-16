import { ChangeDetectorRef, Component, VERSION, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Appointment } from './appointment.model';
import { LogService } from './log.service';
import { OperationResponse } from './response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   scannerEnabled: boolean = true;
   transports: Transport[] = [];
   information: string = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  scanResult: any;
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];

  constructor(private logService: LogService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";
    this.scanResult = $event
    const appointment = new Appointment($event);
    this.logService.logAppointment(appointment).subscribe(
      (result: OperationResponse) => {
        this.information = $event;
        this.transports = result.object;
        this.cd.markForCheck();
      },
      (error: any) => {
        this.information = "Ha ocurrido un error por favor intentalo nuevamente ... ";
        this.cd.markForCheck();
      });
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  }

}

interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}