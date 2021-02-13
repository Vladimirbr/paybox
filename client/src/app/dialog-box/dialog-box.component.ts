import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MissionData } from '../interfaces/MissionData';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent implements OnInit {
  action: string;
  local_data: { key: string; value: any } = {
    key: '',
    value: '',
  };
  oldValue: object | string;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: MissionData
  ) {
    this.local_data.key = data.key;
    this.local_data.value = JSON.stringify(data.value, null, 2);
    this.action = this.data.action;
    this.oldValue = data.value;
  }

  ngOnInit(): void {}

  doAction(): void {
    if (this.local_data.value && this.isJsonString(this.local_data.value)) {
      this.local_data.value = JSON.parse(this.local_data.value);
    } else {
      return alert('Value is not valid json');
    }

    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.local_data.value = this.oldValue;
    this.dialogRef.close({ event: 'Cancel' });
  }

  isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
