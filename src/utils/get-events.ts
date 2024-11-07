export default async function getEvents(setEvents: any) {

    try {
        const response = await fetch(`https://rf-json-server.herokuapp.com/events/`);
        const responseJson = await response.json();
        responseJson && setEvents(responseJson);
    }
    catch {
        throw new Error('Error getting products')
    }

}