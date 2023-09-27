// analyzing the type and sending a corresponding
//  description to the place where the function is 
//  called
export const detectType = (type) => {
    switch (type) {
        case "park":
            return "parking space";
        case "home":
            return "home";
        case "job":
            return "office";
        case "goto":
            return "place to go";
    }
}

export const setStorage = (data) => {
    // Prepares the data for sending to local storage
    const strData = JSON.stringify(data);

    // Updates the local storage
    localStorage.setItem('notes', strData);
};

var carIcon = L.icon({
    iconUrl: 'https://www.clipartmax.com/png/small/61-616026_red-driver-marker-clip-art-at-clker-car-marker-png.png',
    iconSize: [38, 38], // size of the icon
});

var homeIcon = L.icon({
    iconUrl: 'https://png.pngtree.com/png-vector/20220722/ourlarge/pngtree-home-pin-map-location-icon-marker-png-image_6032844.png',
    iconSize: [38, 38], // size of the icon
});

var companyIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3846/3846807.png',
    iconSize: [38, 38], // size of the icon
});

var vocationIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/10105/10105880.png',
    iconSize: [38, 38], // size of the icon
});

export function detectIcon(type) {
    switch (type) {
        case "park":
            return carIcon;
        case "home":
            return homeIcon;
        case "job":
            return companyIcon;
        case "goto":
            return vocationIcon;
    }
}