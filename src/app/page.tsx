"use client";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin, Phone, ArrowRight, Star, Menu, X, Code, Zap, Heart, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ModernPortfolio() {
  const isMobile = useIsMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const projects = [
    {
      id: 1,
      title: "TASKLY – Task & Project Management App",
      description: "Collaborative web app for managing tasks and projects using Scrum and Kanban.",
      image: "/taskly.jpg?height=300&width=800",
      technologies: ["Next.js", "React", "Supabase", "PostgreSQL", "Recharts", "AG Grid"],
      featured: true,
      category: "Full-Stack",
    },
    {
      id: 2,
      title: "TUNIJOBS – Freelance Job Matching Platform",
      description: "Dashboard system for clients and freelancers to post/apply to job offers.",
      image: "/tunijobs.jpg?height=300&width=500",
      technologies: ["HTML", "CSS", "Bootstrap", "PHP", "MySQL"],
      featured: true,
      category: "Web App",
    },
  ]

  const skills = [
    { name: "Next.js", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 92, category: "Frontend" },
    { name: "Shadcn UI", level: 95, category: "Frontend" },
    { name: "Tailwind CSS", level: 87, category: "Frontend" },
    { name: "Node.js", level: 88, category: "Backend" },
    { name: "PHP", level: 95, category: "Backend" },
    { name: "PostgreSQL", level: 90, category: "Database" },
    { name: "Supabase", level: 90, category: "Database" },
  ]

  const achievements = [
    {
      icon: <Code className="w-6 h-6" />,
      number: "10+",
      label: "Projects Completed",
      description: "From concept to deployment"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      number: "8",
      label: "Technologies Mastered",
      description: "Modern web stack expertise"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      number: "100%",
      label: "Passion Driven",
      description: "Love what I do"
    },
    {
      icon: <Target className="w-6 h-6" />,
      number: "24/7",
      label: "Problem Solver",
      description: "Always ready for challenges"
    }
  ]

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Oussema Ben Yahia
            </div>
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            )}
          </div>

          {/* Mobile Navigation Menu */}
          {isMobile && mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-white/20 dark:border-slate-700/50 shadow-lg">
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="block text-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 py-2"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        <div className="text-center z-10 px-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 relative group">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/d2300 p45.jpg?height=128&width=128"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block text-slate-800 dark:text-white mb-2">Hi, I&rsquo;m</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Oussema Ben Yahia
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Software Engineering Student & Full-Stack Developer crafting exceptional digital experiences with modern
              technologies
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => window.open('/resume.pdf', '_blank')}
            >
              Download Resume
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
           
          </div>

          <div className="flex justify-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110"
              asChild
            >
              <Link href="https://github.com/Oussema-BY" target="_blank">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110"
              asChild
            >
              <Link href="https://www.linkedin.com/in/oussema-ben-yahia/" target="_blank">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110"
              asChild
            >
              <Link href="mailto:oussemabenyahia89@gmail.com">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-32 px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-pink-600/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
              <Star className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">About Me</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
              Crafting Digital
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating digital solutions that make a difference in people&rsquo;s lives
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-20 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">My Journey</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      I&rsquo;m a software engineering student with hands-on experience building modern web applications through academic and personal projects. 
                      <br />My passion for technology drives me to continuously learn and adapt to new challenges in the ever-evolving tech landscape.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">My Expertise</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      I specialize in modern technologies like React, Next.js, and Supabase, with a focus on delivering clean, efficient code and intuitive user experiences. 
                      <br />Every project is an opportunity to solve real-world problems through innovative digital solutions.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">My Philosophy</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      I believe great software comes from understanding user needs and translating them into elegant, functional solutions. 
                      <br />My approach combines technical excellence with creative problem-solving to deliver exceptional digital experiences.
                </p>
              </div>
            </div>
          </div>
          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-8 bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {achievement.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  {achievement.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {achievement.description}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill) => (
              <Card
                key={skill.name}
                className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800 dark:text-white">{skill.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">Proficiency</span>
                      <span className="text-slate-800 dark:text-white font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A showcase of my recent work and creative solutions
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group"
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-slate-800 dark:text-white">{project.title}</CardTitle>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {project.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>  
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">Let&rsquo;s Work Together</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            I&rsquo;m always excited to take on new challenges and collaborate on innovative projects. Let&rsquo;s create something
            amazing together!
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Email</h3>
              <p className="text-slate-600 dark:text-slate-300">oussemabenyahia89@gmail.com</p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Phone</h3>
              <p className="text-slate-600 dark:text-slate-300">+216 58 185 125</p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Location</h3>
              <p className="text-slate-600 dark:text-slate-300">Tunis, Tunisia</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Oussema Ben Yahia
              </div>
              <p className="text-slate-400">Building the future, one line of code at a time.</p>
            </div>

            <div className="flex space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white transition-colors duration-300"
                asChild
              >
                <Link href="https://github.com/Oussema-BY" target="_blank">
                  <Github className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white transition-colors duration-300"
                asChild
              >
                <Link href="https://www.linkedin.com/in/oussema-ben-yahia/" target="_blank">
                  <Linkedin className="w-5 h-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white transition-colors duration-300"
                asChild
              >
                <Link href="mailto:oussemabenyahia89@gmail.com">
                  <Mail className="w-5 h-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">© 2025 Oussema Ben Yahia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}