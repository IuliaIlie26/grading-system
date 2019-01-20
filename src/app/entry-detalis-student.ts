export class EntryDetailsStudent{
    constructor(public id:number,public courseName:string, public teacherName:string, public grade:number){

        this.id=id;
        this.courseName = courseName;
        this.teacherName = teacherName;
        this.grade = grade;

    }
}
