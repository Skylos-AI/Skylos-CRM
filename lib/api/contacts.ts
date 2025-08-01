import { Contact } from '../types/contact'
import { mockContacts } from '../mock-data'

export class ContactsService {
  private static contacts: Contact[] = [...mockContacts]

  static async getContacts(): Promise<Contact[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.contacts]
  }

  static async getContact(id: string): Promise<Contact | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.contacts.find(contact => contact.id === id) || null
  }

  static async getContactsByCompany(companyId: string): Promise<Contact[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.contacts.filter(contact => contact.companyId === companyId)
  }

  static async updateContact(id: string, updates: Partial<Contact>): Promise<Contact> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const contactIndex = this.contacts.findIndex(contact => contact.id === id)
    if (contactIndex === -1) {
      throw new Error('Contact not found')
    }

    const updatedContact = {
      ...this.contacts[contactIndex],
      ...updates,
      updatedAt: new Date()
    }

    this.contacts[contactIndex] = updatedContact
    return updatedContact
  }

  static async createContact(contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.contacts.push(newContact)
    return newContact
  }
}