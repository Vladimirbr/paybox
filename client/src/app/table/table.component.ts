import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

import { HttpService } from '../services/http.service';
import { MissionData } from '../interfaces/MissionData';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['key', 'value', 'action'];
  dataSource: MissionData[] = [];

  showError: boolean = false;
  errorMessage: string = '';

  showSpinner: boolean = false;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog, private sender: HttpService) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.sender.fetchAllMissions().subscribe(
      (resData) => {
        this.showSpinner = false;
        this.hideErrorMessage();
        this.dataSource = resData.data;
      },
      (error) => {
        this.showSpinner = false;
        this.showErrorMessage(error);
      }
    );
  }

  openDialog(action: string, obj: MissionData) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: MissionData) {
    if (!row_obj || !row_obj.key) return alert("No key added, can't add");

    this.sendCreateUpdateMission('Add', row_obj);
  }
  updateRowData(row_obj: MissionData) {
    this.sendCreateUpdateMission('Update', row_obj);
  }
  deleteRowData(row_obj: MissionData) {
    this.showSpinner = true;
    this.sender.deleteMissionByKey({ key: row_obj.key }).subscribe(
      (resData) => {
        this.showSpinner = false;
        this.hideErrorMessage();
        this.dataSource = this.dataSource.filter((source, key) => {
          return source.key != row_obj.key;
        });
      },
      (error) => {
        this.showSpinner = false;
        this.showErrorMessage(error);
      }
    );
  }

  sendCreateUpdateMission(action: string, params) {
    this.showSpinner = true;
    this.sender.createUpdateMission(params).subscribe(
      (resData) => {
        this.showSpinner = false;
        this.hideErrorMessage();
        switch (action) {
          case 'Add':
            this.addToRowToTable(params);
            break;
          case 'Update':
            this.updateRow(params);
            break;
        }
      },
      (error) => {
        this.showSpinner = false;
        this.showErrorMessage(error);
      }
    );
  }

  addToRowToTable(row_obj: MissionData) {
    this.dataSource.push({
      key: row_obj.key,
      value: row_obj.value,
    });
    this.table.renderRows();
  }

  updateRow(row_obj: MissionData) {
    this.dataSource = this.dataSource.filter((source, key) => {
      if (source.key == row_obj.key) {
        source.value = row_obj.value;
      }
      return true;
    });
  }

  showErrorMessage(error) {
    this.errorMessage = error.message;
    this.showError = true;
    console.error(error.message);
  }

  hideErrorMessage() {
    this.errorMessage = '';
    this.showError = false;
  }
}
