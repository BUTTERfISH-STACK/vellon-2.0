import { promises as fs } from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'

const DB_DIR = path.join(process.cwd(), 'data')

interface User {
  id: string
  email: string
  role: 'USER' | 'AMBASSADOR'
  createdAt: string
}

interface Ambassador {
  id: string
  userId: string
  referralCode: string
  totalEarnings: number
  createdAt: string
}

interface Payment {
  id: string
  userId: string
  amount: number
  status: 'PENDING' | 'PAID'
  referralCode?: string
  ambassadorCommission: number
  createdAt: string
}

interface ReferralClick {
  id: string
  referralCode: string
  ipAddress: string
  createdAt: string
}

class SimpleDB {
  private users: User[] = []
  private ambassadors: Ambassador[] = []
  private payments: Payment[] = []
  private referralClicks: ReferralClick[] = []
  private loaded = false

  private async ensureDataDir() {
    try {
      await fs.access(DB_DIR)
    } catch {
      await fs.mkdir(DB_DIR, { recursive: true })
    }
  }

  private async loadData() {
    if (this.loaded) return

    await this.ensureDataDir()

    try {
      const usersData = await fs.readFile(path.join(DB_DIR, 'users.json'), 'utf-8')
      this.users = JSON.parse(usersData)
    } catch {
      this.users = []
    }

    try {
      const ambassadorsData = await fs.readFile(path.join(DB_DIR, 'ambassadors.json'), 'utf-8')
      this.ambassadors = JSON.parse(ambassadorsData)
    } catch {
      this.ambassadors = []
    }

    try {
      const paymentsData = await fs.readFile(path.join(DB_DIR, 'payments.json'), 'utf-8')
      this.payments = JSON.parse(paymentsData)
    } catch {
      this.payments = []
    }

    try {
      const clicksData = await fs.readFile(path.join(DB_DIR, 'referralClicks.json'), 'utf-8')
      this.referralClicks = JSON.parse(clicksData)
    } catch {
      this.referralClicks = []
    }

    this.loaded = true
  }

  private async saveData() {
    await this.ensureDataDir()

    await fs.writeFile(path.join(DB_DIR, 'users.json'), JSON.stringify(this.users, null, 2))
    await fs.writeFile(path.join(DB_DIR, 'ambassadors.json'), JSON.stringify(this.ambassadors, null, 2))
    await fs.writeFile(path.join(DB_DIR, 'payments.json'), JSON.stringify(this.payments, null, 2))
    await fs.writeFile(path.join(DB_DIR, 'referralClicks.json'), JSON.stringify(this.referralClicks, null, 2))
  }

  // User methods
  async findUserByEmail(email: string): Promise<User | null> {
    await this.loadData()
    return this.users.find(u => u.email === email) || null
  }

  async findUserById(id: string): Promise<User | null> {
    await this.loadData()
    return this.users.find(u => u.id === id) || null
  }

  async createUser(data: { email: string; role?: 'USER' | 'AMBASSADOR' }): Promise<User> {
    await this.loadData()
    const user: User = {
      id: randomBytes(8).toString('hex'),
      email: data.email,
      role: data.role || 'USER',
      createdAt: new Date().toISOString()
    }
    this.users.push(user)
    await this.saveData()
    return user
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    await this.loadData()
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) return null

    this.users[index] = { ...this.users[index], ...data }
    await this.saveData()
    return this.users[index]
  }

  // Ambassador methods
  async findAmbassadorByUserId(userId: string): Promise<Ambassador | null> {
    await this.loadData()
    return this.ambassadors.find(a => a.userId === userId) || null
  }

  async findAmbassadorByReferralCode(referralCode: string): Promise<Ambassador | null> {
    await this.loadData()
    return this.ambassadors.find(a => a.referralCode === referralCode) || null
  }

  async createAmbassador(data: { userId: string; referralCode: string }): Promise<Ambassador> {
    await this.loadData()
    const ambassador: Ambassador = {
      id: randomBytes(8).toString('hex'),
      userId: data.userId,
      referralCode: data.referralCode,
      totalEarnings: 0,
      createdAt: new Date().toISOString()
    }
    this.ambassadors.push(ambassador)
    await this.saveData()
    return ambassador
  }

  // Payment methods
  async createPayment(data: {
    userId: string
    amount?: number
    referralCode?: string
    ambassadorCommission?: number
  }): Promise<Payment> {
    await this.loadData()
    const payment: Payment = {
      id: randomBytes(8).toString('hex'),
      userId: data.userId,
      amount: data.amount || 119.99,
      status: 'PENDING',
      referralCode: data.referralCode,
      ambassadorCommission: data.ambassadorCommission || 35,
      createdAt: new Date().toISOString()
    }
    this.payments.push(payment)
    await this.saveData()
    return payment
  }

  // Referral click methods
  async createReferralClick(data: { referralCode: string; ipAddress: string }): Promise<ReferralClick> {
    await this.loadData()
    const click: ReferralClick = {
      id: randomBytes(8).toString('hex'),
      referralCode: data.referralCode,
      ipAddress: data.ipAddress,
      createdAt: new Date().toISOString()
    }
    this.referralClicks.push(click)
    await this.saveData()
    return click
  }
}

export const db = new SimpleDB()