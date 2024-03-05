import { Role, User } from '@seg-apps-web/api-interfaces';
import { Layout } from '../../components';
import { HTTP, getCookie } from '../../services';
import './home-styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { NewsEntry, TNewsEntry } from './NewsEntry';

const API_KEY = '375ed8979e1640b7af9ffca163021e96'

const Home = () => {
  const user = getCookie<User & { roles: Role['title'] }>('user')
  const [newsEntries, setNewsEntries] = useState<TNewsEntry[]>([])

  useEffect(() => {
    ; (async () => {
      await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${API_KEY}`).then(res => res.json()).then(data => setNewsEntries(data.articles))
    })()
  }, [])

  if (!user) return null


  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1em' }}>
        <h1>Bienvenido {user.name} {user.lastName}!</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em', justifyContent: 'center' }}>
          {newsEntries.map(ne => <NewsEntry key={ne.title} entry={ne} />)}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
