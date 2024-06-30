// 'use client'

// import { useState, useEffect } from 'react'

// const THEME_KEY = 'theme'
// const LIGHT_THEME = 'light'
// const DARK_THEME = 'dark'

// export default function DarkModeButton() {
//   const [theme, setTheme] = useState<string | null>(null)

//   const toggleDarkMode = () => {
//     setTheme(prev => {
//       const newTheme = prev === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
//       setStorage(THEME_KEY, newTheme)
//       return newTheme
//     })
//   }

//   useEffect(() => {
//     if (getStorage(THEME_KEY)) {
//       setTheme(getStorage(THEME_KEY))
//     } else {
//       setStorage(THEME_KEY, LIGHT_THEME)
//       setTheme(LIGHT_THEME)
//     }
//   }, [])

//   useEffect(() => {
//     if (theme === DARK_THEME) {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }
//   }, [theme])

//   return (
//     <button
//       onClick={toggleDarkMode}
//       style={{
//         border: 'none',
//         backgroundColor: 'inherit',
//         cursor: 'pointer',
//       }}
//     >
//       {theme === DARK_THEME ? (
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill-rule="evenodd"
//             clip-rule="evenodd"
//             d="M20.6144 14.6145C19.787 14.8653 18.9093 15.0001 18 15.0001C13.0294 15.0001 9 10.9707 9 6.00013C9 5.09088 9.13484 4.21311 9.3856 3.38574C5.69007 4.50583 3 7.93883 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.0613 21.0001 19.4943 18.3101 20.6144 14.6145Z"
//             fill="#f6ec81"
//           />
//         </svg>
//       ) : (
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <g clip-path="url(#clip0_2909_15060)">
//             <path
//               d="M4.069 13H0V11H4.069C4.028 11.328 4 11.661 4 12C4 12.339 4.028 12.672 4.069 13ZM7.103 5.688L4.222 2.807L2.808 4.221L5.689 7.102C6.1 6.573 6.574 6.099 7.103 5.688ZM18.312 7.102L21.193 4.221L19.779 2.807L16.898 5.688C17.426 6.099 17.9 6.574 18.312 7.102ZM12 4C12.339 4 12.672 4.028 13 4.069V0H11V4.069C11.328 4.028 11.661 4 12 4ZM12 20C11.661 20 11.328 19.972 11 19.931V24H13V19.931C12.672 19.972 12.339 20 12 20ZM19.931 11C19.972 11.328 20 11.661 20 12C20 12.339 19.972 12.672 19.931 13H24V11H19.931ZM16.898 18.312L19.778 21.192L21.193 19.778L18.313 16.898C17.901 17.426 17.427 17.9 16.898 18.312ZM5.688 16.897L2.808 19.777L4.222 21.191L7.102 18.311C6.574 17.9 6.099 17.426 5.688 16.897ZM12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12C18 8.686 15.314 6 12 6Z"
//               fill="#ea0707"
//             />
//           </g>
//           <defs>
//             <clipPath id="clip0_2909_15060">
//               <rect width="24" height="24" />
//             </clipPath>
//           </defs>
//         </svg>
//       )}
//     </button>
//   )
// }

// const getStorage = (key: string): string | null => localStorage.getItem(key)
// const setStorage = (key: string, value: string): void =>
//   localStorage.setItem(key, value)
