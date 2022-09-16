import markdownStyles from './markdown-styles.module.css'
import { PortableText } from '@portabletext/react'

export default function PostBody({ content }) {
  return (
    <div className={`relative z-[2] max-w-2xl mx-auto ${markdownStyles.markdown}`}>
      {content && <PortableText value={content} />}
    </div>
  )
}
