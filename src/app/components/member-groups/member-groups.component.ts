import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MemberGroup } from 'src/app/models/member-group';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { AddMemberGroupDialogComponent } from '../dialogs/add-member-group-dialog/add-member-group-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { Guide } from 'src/app/const/guide-csv';
import { FileService } from 'src/app/services/file-service';
import { FileDTO } from 'src/app/models/helpers/file-dto';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-member-groups',
  templateUrl: './member-groups.component.html',
  styleUrls: ['./member-groups.component.css']
})
export class MemberGroupsComponent implements OnInit {

  displayedColumns = ['name'];
  dataSource: MatTableDataSource<MemberGroup> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('uploadCsv') uploadCsvInputElement: ElementRef;

  constructor(private memberGroupService:MemberGroupService, 
    private matDialog:MatDialog,private snackBar:MatSnackBar,private titleService:TitleService,
    private authService:AuthService,private router:Router,private fileService:FileService)
  {
    this.titleService.changeTitle("Member groups");
  }

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
        this.loadGroups();
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  public fileChosen(files: FileList){
    if(files && files.length > 0) {
       let file : File = files.item(0); 
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let fileDTO:FileDTO = new FileDTO();
            fileDTO.csvText=reader.result as string;
            this.fileService.upload(fileDTO).subscribe(response=>{
              alert(response);
              this.loadGroups();
            })
         }
         this.uploadCsvInputElement.nativeElement.value='';
      }
  }

  loadGroups()
  {
    this.memberGroupService.getAllGroups().subscribe(data => {
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(AddMemberGroupDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(groupName=>{
      this.addGroup(groupName)
    })
  }

  addGroup(groupName:string)
  {
    if(this.isValidInput(groupName))
    {
      let memberGroup = new MemberGroup();
      memberGroup.name=groupName;
      this.memberGroupService.addGroup(memberGroup).subscribe(response=>{
        this.loadGroups();
        this.showSnackbar("Group "+memberGroup.name+" created.");
      });   
    }
  }

  isValidInput(groupName:string)
  {
    return groupName && groupName.trim().length>0;
  }

  viewGroupClick(memberGroup:MemberGroup)
  {
    this.router.navigate(['/members/'+memberGroup.id]);
  }

  showGuide()
  {
    alert(Guide.TEXT)
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}