export class Pig{
    pigBreed : string
    pid : string
    constructor(pigBreed: string, pid:string){
      this.pigBreed = pigBreed
      this.pid = pid
    }
}

export class Location{
    lname : string
    longitude : string
    latitide : string
    constructor(lname: string, longitude: string, latitude: string){
        this.lname = lname
        this.latitide = latitude
        this.longitude = longitude
    }
}

enum Status{
    Ready = "READY FOR PICKUP",
    Retrieved = "RETRIEVED"
}

export class PigReport{
    repName : string
    repPhone : number
    pigInfo : Pig
    location : Location
    extraNotes : string
    addedOn : number
    status : Status
    constructor(repName:string, repPhone : number, pigInfo: Pig, location:Location, extraNotes:string){
        this.repName = repName
        this.repPhone = repPhone
        this.pigInfo = pigInfo
        this.location = location
        this.extraNotes = extraNotes
        this.addedOn = (new Date().getTime())
        this.status = Status.Ready
    }

}