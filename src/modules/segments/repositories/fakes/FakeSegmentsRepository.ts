import { ICreateSegmentDTO } from '@modules/segments/dtos/ICreateSegmentDTO';
import { FakeSegment } from '@modules/segments/models/fakes/FakeSegment';
import { ISegment } from '@modules/segments/models/ISegment';
import { ISegmentsRepository } from '@modules/segments/repositories/ISegmentsRepository';

class FakeSegmentsRepository implements ISegmentsRepository {
  private segments: ISegment[] = [];

  public async findById(user_id: string): Promise<ISegment | undefined> {
    const findUser = this.segments.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<ISegment | undefined> {
    const segment = this.segments.find(user => user.name === email);

    return segment;
  }

  public async create(data: ICreateSegmentDTO): Promise<ISegment> {
    const segment = new FakeSegment(data);
    this.segments.push(segment);
    return segment;
  }

  public async update(segment: ISegment): Promise<ISegment> {
    this.segments = this.segments.map(oldSegment =>
      oldSegment.id !== segment.id ? oldSegment : segment,
    );

    return segment;
  }

  public async getAll(): Promise<ISegment[]> {
    return this.segments;
  }

  public async getTotal(): Promise<number> {
    return this.segments.length;
  }

  public async save(data: ISegment): Promise<void> {
    const searchUser = this.segments.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.segments[searchUser], data);
    }
  }

  public async delete(user: ISegment): Promise<void> {
    const listWithRemovedUsers = this.segments.filter(item => item.id !== user.id);
    this.segments = listWithRemovedUsers;
  }
}

export default FakeSegmentsRepository;
