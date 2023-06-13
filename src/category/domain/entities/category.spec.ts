import { omit } from "lodash";
import { validate as isUiidValid } from "uuid";
import { Category, CategoryProperties } from "./category";

type CategoryData = {
  props: CategoryProperties;
  id?: string;
}

describe("Category Tests", () => {
  describe("Category constructor", () => {
    test("category constructor - with all constructor properties", () => {
      const CATEGORY_MOCKED_DATA: CategoryProperties = {
        name: "test-name",
        created_at: new Date(),
        description: "test-description",
        is_active: true,
      };

      const category = new Category(CATEGORY_MOCKED_DATA);

      expect(category.props).toStrictEqual(CATEGORY_MOCKED_DATA);
    });
    test("category constructor - missing non required properties", () => {
      const CATEGORY_NAME = "test-name";
      const category = new Category({ name: CATEGORY_NAME });
      const CATEGORY_PROPS = omit(category.props, "created_at");

      expect(CATEGORY_PROPS).toStrictEqual({
        name: CATEGORY_NAME,
        description: undefined,
        is_active: true,
      });

      expect(category.props.created_at).toBeInstanceOf(Date);
    });

    test("if id is valid", () => {
      const VALID_MOCKED_UUID_V4 = "1824ec3b-49a7-42f9-91d2-f979d45f5540";

      const MOCKED_CATEGORY_PROPS : CategoryData[] = [
        { props: { name: "movie-1" } },
        { props: { name: "movie-1" }, id: null },
        { props: { name: "movie-1" }, id: undefined },
        { props: { name: "movie-1" }, id: VALID_MOCKED_UUID_V4 },
      ];

      MOCKED_CATEGORY_PROPS.forEach((i) => {
        const category = new Category(i.props, i.id);

        expect(category.id).not.toBeNull();
        expect(isUiidValid(category.id)).toBeTruthy();
      });
    });
  });
  describe("Category getters", () => {
    const CATEGORY_PROPERTIES: CategoryProperties = {
      name: "name-test",
      description: "category-description",
      created_at: new Date(),
      is_active: true,
    };

    test("name getter", () => {
      const category = new Category({ name: CATEGORY_PROPERTIES.name });
      expect(category.name).toBe(CATEGORY_PROPERTIES.name);
    });

    test("description getter", () => {
      const category = new Category(CATEGORY_PROPERTIES);
      expect(category.description).toBe(CATEGORY_PROPERTIES.description);
    });

    test("is_active getter", () => {
      const category = new Category(CATEGORY_PROPERTIES);
      expect(category.is_active).toBe(CATEGORY_PROPERTIES.is_active);
    });

    test("created_at getter", () => {
      const category = new Category(CATEGORY_PROPERTIES);
      expect(category.created_at).toBe(CATEGORY_PROPERTIES.created_at);
    });
  });
  describe("Category setters", () => {
    test("description setter", () => {
      const CATEGORY_PROPERTIES: CategoryProperties = {
        name: "test-name",
        description: "test-description",
      };

      const category = new Category(CATEGORY_PROPERTIES);
      expect(category.props.description).toBe(CATEGORY_PROPERTIES.description);

      category["description"] = "updated-description";
      expect(category.props.description).toBe("updated-description");
    });
    test("is_active setter", () => {
      const CATEGORY_PROPERTIES: CategoryProperties = {
        name: "test-name",
        description: "test-description",
      };

      const category = new Category(CATEGORY_PROPERTIES);
      expect(category.props.is_active).toBe(true);

      category["is_active"] = false;
      expect(category.props.is_active).toBe(false);
    });
  });
});
