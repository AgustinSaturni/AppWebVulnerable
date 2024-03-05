import { CSSProperties } from "react"

export type TNewsEntry = {
  author: string
  content: string | null
  description: string
  publishedAt: string
  source: { id: string, name: string }
  title: string
  url: string
  urlToImage: string | null
}

export const NewsEntry = ({ entry }: { entry: TNewsEntry }) => {
  const { content, title, urlToImage } = entry
  if (!urlToImage) return null
  return (
    <div style={styles['container']}>
      {urlToImage ? <img src={urlToImage} style={styles['img']} alt={title} /> : null}
      {/* <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}> */}
      <h3>{title}</h3>
      <p>{content}</p>
      {/* </div> */}
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    float: 'left',
    margin: '0 1em 1em 0',
    padding: '1em',
    width: '25em',
    border: '1px solid gray',
    borderRadius: '1em'
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '1em'
  }
}