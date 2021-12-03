import { Days } from "../constants";
import { NpcAvailable } from "../model";

export const DrunkPyro: NpcAvailable = {
    name: "Drunk Pyro",
    available: {
        from: '19:00',
        to: '23:00'
    }
}

export const Zoe: NpcAvailable = {
    name: "Zoe",
    available: {
        from: '19:00',
        to: '03:00'
    }
}

export const Olga: NpcAvailable = {
    name: "Olga",
    available: {
        from: '11:00',
        to: '19:00',
        fromDate: Days.TWO
    }
}

export const Berdy: NpcAvailable = {
    name: "Berdy",
    available: {
        from: '11:00',
        to: '19:00',
        fromDate: Days.TWO
    }
}

export const Gregory: NpcAvailable = {
    name: "Gregory",
    available: {
        from: "12:00",
        to: "04:00"
    }
}

export const Funicula: NpcAvailable = {
    name: "Funicula",
    available: {
        from: '19:00',
        to: '03:00'
    }
}

export const Velno: NpcAvailable = {
    name: "Velno",
    available: {
        from: "06:00",
        to: "06:00"
    }
}

export const Lennet: NpcAvailable = {
    name: "Lennet",
    available: {
        from: "11:00",
        to: "19:00"
    }
}

export const Lennet_Date: NpcAvailable = {
    name: "Lennet",
    available: {
        from: "19:00",
        to: "23:00"
    }
}

export const Primrose: NpcAvailable = {
    name: "Primrose",
    available: {
        from: "11:00",
        to: "03:00"
    }
}

export const Seedy_Owner: NpcAvailable = {
    name: "Seedy's Owner",
    available: {
        from: "06:00",
        to: "06:00"
    }
}

export const Gordon_Gourmet: NpcAvailable = {
    name: "Gordon Gourmet",
    available: {
        from: "06:00",
        to: "06:00"
    }
}

export const Tanbam: NpcAvailable = {
    name: "Tanbam",
    available: {
        from: "19:00",
        to: "03:00"
    }
}

export const Morris: NpcAvailable = {
    name: "Morris",
    available: {
        from: "11:00",
        to: "19:00",
        fromDate: Days.TWO
    }
}

export const Candice: NpcAvailable = {
    name: "Candice",
    available: {
        from: "19:00",
        to: "03:00"
    }
}

export const Tomesso: NpcAvailable = {
    name: "Tomesso",
    available: {
        from: "19:00",
        to: "03:00"
    }
}

export const Biggs: NpcAvailable = {
    name: "Biggs",
    available: {
        from: "06:00",
        to: "02:00"
    }
}

export const YusnaanNpcs = {
    DrunkPyro,
    Zoe,
    Olga,
    Berdy,
    Gregory,
    Funicula,
    Velno,
    Lennet,
    Lennet_Date,
    Primrose,
    Seedy_Owner,
    Gordon_Gourmet,
    Tanbam,
    Morris,
    Candice,
    Tomesso,
    Biggs
}