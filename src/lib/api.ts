export default async function FetchCar(p0: number){
    const res = await fetch(`https://car-nextjs-api.cheatdev.online/cars`);

    const data = await res.json();
    return data;
}