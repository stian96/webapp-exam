import type { Performer } from "../types/performer"

describe("Performer type", () => {
    it("Should allow to create a valid Performer instance", () => {
        
        // Simple performer instance.
        const performer: Performer = {
            id: "123",
            userId: "abc-123-979",
            gender: "male",
            sport: "running"
        }

        // Verify that the object matches the Performer type.
        expect(performer).toBeDefined()
        expect(performer.id).toBeDefined()
        expect(performer.userId).toBeDefined()
        expect(performer.gender).toBeDefined()
        expect(performer.sport).toBeDefined()
    })
})