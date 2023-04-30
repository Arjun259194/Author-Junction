import { FC } from "react"
import { motion } from "framer-motion"
import { ReactNode } from "react"

const FadeIn: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: 0.2,
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
