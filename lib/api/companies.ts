import { Company } from '../types/company'
import { mockCompanies } from '../mock-data'

export class CompaniesService {
  private static companies: Company[] = [...mockCompanies]

  static async getCompanies(): Promise<Company[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.companies]
  }

  static async getCompany(id: string): Promise<Company | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.companies.find(company => company.id === id) || null
  }

  static async updateCompany(id: string, updates: Partial<Company>): Promise<Company> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const companyIndex = this.companies.findIndex(company => company.id === id)
    if (companyIndex === -1) {
      throw new Error('Company not found')
    }

    const updatedCompany = {
      ...this.companies[companyIndex],
      ...updates,
      updatedAt: new Date()
    }

    this.companies[companyIndex] = updatedCompany
    return updatedCompany
  }

  static async createCompany(companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newCompany: Company = {
      ...companyData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.companies.push(newCompany)
    return newCompany
  }
}