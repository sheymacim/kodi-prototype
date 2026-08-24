import Avatar from './Avatar.jsx';
import Badge from './Badge.jsx';
import Card from './Card.jsx';

export default function CreatorCard({ creator }) {
  return (
    <Card className="creator-card">
      <div className="creator-card-header">
        <Avatar name={creator.name} />
        <div>
          <h3>{creator.name}</h3>
          <p>@{creator.username}</p>
        </div>
      </div>
      <div className="creator-card-body">
        <Badge tone="primary">{creator.topic}</Badge>
        <p>{creator.followers} takipçi</p>
        <strong>{creator.metric}</strong>
      </div>
    </Card>
  );
}
