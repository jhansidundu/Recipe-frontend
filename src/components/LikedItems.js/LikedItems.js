import { isTokenValid } from "../../services/api/endpoints/auth.Api";
import { likedList } from "../../services/api/endpoints/liked";
const LikedItems = () => {
  async function isTokenCorrect() {
    await isTokenValid();
    const res = await likedList();
  }
  isTokenCorrect();

  return <></>;
};

export default LikedItems;
