interface IEvents {
  title: string;
  date: string;
  venue: string;
  image: string;
  time?: string;
}
interface IVenueOwner {
  name: string;
  email: string;

}

export const events: IEvents[] = [
  {
      title: "IU Hoosiers vs Northwestern Wildcats",
      date: "2024-02-18",
      venue: "Assembly Hall",
      time: "3:00 PM",
      image:
        "https://cdn.vox-cdn.com/thumbor/5d-NuwLaj1O8-Cqn203pYpbvO3M=/0x0:4096x2730/1200x800/filters:focal(1721x1038:2375x1692)/cdn.vox-cdn.com/uploads/chorus_image/image/71981748/FpDehdlWcAAnJLi.0.jpg",
        
    },
    {
      title: "McCormick Tribune Ice Rink",
      date: "2024-01-11",
      venue: "Millennium Park",
      time: "8:10 PM",
      image:
        "https://cdn.choosechicago.com/uploads/2023/11/mpicerink-900x400.jpg",
    },
    {
      title: "Tampa Bay Chocolate Festival",
      date: "2024-02-19",
      venue: "Gulfview Square Mall",
      time: "10:00 AM",
      image:
        "https://thatssotampa.com/wp-content/uploads/2023/12/ChocFestNew.jpg",
    },
    {
      title: "United States Grand Prix",
      date: "2024-10-25",
      venue: "Circuit of the Americas",
      time: "2:00 PM",
      image:
        "https://media.formula1.com/content/dam/fom-website/sutton/2022/USA/Sunday/1435987206.jpg.img.1536.high.jpg",
    },
    {
      title: "The Book of Mormon",
      date: "2024-02-20",
      venue: "Eugene O'Neill Theatre",
      time: "2:00 PM",
      image:
        "https://ca-times.brightspotcdn.com/dims4/default/1a562fc/2147483647/strip/true/crop/1701x1344+0+0/resize/1200x948!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F4c%2F2e%2F1e7ee8a28059e886bad017b8d2c8%2Fla-xpm-photo-2013-mar-26-la-et-cm-book-of-mormon-breaks-box-office-records-20130325",
    },
    {
      title: "IU Hoosiers vs Purdue Boilermakers",
      date: "2023-02-18",
      venue: "Assembly Hall",
      time: "3:00 PM",
      image:
        "https://cdn.vox-cdn.com/thumbor/5d-NuwLaj1O8-Cqn203pYpbvO3M=/0x0:4096x2730/1200x800/filters:focal(1721x1038:2375x1692)/cdn.vox-cdn.com/uploads/chorus_image/image/71981748/FpDehdlWcAAnJLi.0.jpg",
    
    },{
      title:"Taylor Swift Lover Fest",
      date:"2023-07-01",
      venue:"Soldier Field",
      time:"7:00 PM",
      image:"https://nypost.com/wp-content/uploads/sites/2/2019/09/taylor-swift-lover.jpg?quality=75&strip=all"
    },{
      title:"Chicago Cubs vs St. Louis Cardinals",
      date:"2023-09-01",
      venue:"Wrigley Field",
      time:"1:20 PM",
      image:"https://theanalyst.com/wp-content/uploads/2022/06/cubs-v-cards.jpg"
    },{
      title:"MI Cape Town vs Sunriser Eastern Cape",
      date:"2023-12-01",
      venue:"Newlands",
      time:"7:00 PM",
      image:"https://www.espncricinfo.com/db/PICTURES/CMS/312600/312697.jpg"
    }
];

export const venueOwner: IVenueOwner = {
  name: "Matty Potts",
  email: "mpotts@iu.edu",
}

interface IAnnouncement {
  date?: string;
  announcement?: string;
}
interface IAnnouncements {
  title: string;
  announcements: IAnnouncement[];
}

export const announcements:IAnnouncements[] = [
  {
    title:events[0].title,
    announcements:[{}]
  },{
    title:events[1].title,
    announcements:[{}]
  },{
    title:events[2].title,
    announcements:[{}]
  },{
    title:events[3].title,
    announcements:[{}]
  },{
    title:events[4].title,
    announcements:[{}]
  },{
    title:events[5].title,
    announcements:[{}]
  },{
    title:events[6].title,
    announcements:[{}]
  },{
    title:events[7].title,
    announcements:[{}]
  },{
    title:events[8].title,
    announcements:[{}]
  }
];