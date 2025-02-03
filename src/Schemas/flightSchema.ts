import { z } from 'zod';

export const AirportSchema = z.object({
  skyId: z.string().min(1, 'Sky Id is required'),
  entityId: z.string().min(1, 'Entity Id is required'),
});

const AirlineSchema = z.object({
  name: z.string().min(1, 'Airline name is required'),
  logoUrl: z.string().url('Invalid airline logo URL'),
});

const SegmentSchema = z.array(z.any());

export const LegSchema = z.object({
  departure: z.string().min(1, 'Departure time is required'),
  arrival: z.string().min(1, 'Arrival time is required'),
  durationInMinutes: z.number().min(1, 'Duration must be greater than 0'),
  segments: SegmentSchema,
  carriers: z.object({
    marketing: z
      .array(AirlineSchema)
      .min(1, 'At least one marketing airline required'),
    operating: z.array(AirlineSchema).optional(),
  }),
});

const ItinerarySchema = z.object({
  price: z.object({
    formatted: z.string().min(1, 'Price is required'),
  }),
  legs: z.array(LegSchema).min(1, 'At least one leg is required'),
});

export const ItinerariesSchema = z.array(ItinerarySchema);

export type Itinerary = z.infer<typeof ItinerarySchema>;
