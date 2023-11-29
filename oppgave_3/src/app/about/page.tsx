import Title from '@/components/Title'

/*
  Since many of the pages (About, Contact, and Home) uses the same layout, e.g.
  'wrapper' div and the 'Title' component, it could be appropriate to create
  a common layout component. This would have centralized the reuse of common
  layout elements and simplefied future changes.
*/

const About = () => {
  return (
    <div className="wrapper">
      <Title title="Om oss" />
    </div>
  )
}

export default About
