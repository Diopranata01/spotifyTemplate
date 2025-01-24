// pages/index.js
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Home({ guests }) {
  return (
    <div>
      <h1>Wedding Invitation List</h1>
      <ul>
        {guests.map((guest, index) => (
          <li key={index}>
            <Link href={`/invitation/${guest.name.toLowerCase()}`}>
              {guest.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'guests.json');
  const jsonData = fs.readFileSync(filePath);
  const guests = JSON.parse(jsonData);

  return {
    props: {
      guests,
    },
  };
}