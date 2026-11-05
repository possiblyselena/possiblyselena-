import { json } from '@sveltejs/kit';
import { XMLParser } from 'fast-xml-parser';


export async function GET() {


    const res = await fetch('https://letterboxd.com/possiblyselena/rss/')

    if (!res.ok) {
        console.error('letterboxd error', res.status, await res.text());
        return json([]);
    }

    const data = await res.text();
    const parse = new XMLParser();

    return json(
        parse.parse(data).rss.channel.item.filter(({ 'letterboxd:filmTitle' : title }) => !!title).map(({ 'letterboxd:filmTitle' : title, 'letterboxd:memberRating' : memberRating, 'letterboxd:watchedDate' : watchedDate }) => ({
            title, 
            memberRating, 
            watchedDate,
        }))
    )
}