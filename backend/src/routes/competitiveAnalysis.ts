import express from 'express';
import { Request, Response } from 'express';
import { competitiveAnalysisService } from '../services/competitiveAnalysisService';

const router = express.Router();

// 竞争分析请求接口
interface CompetitiveAnalysisRequest {
  customer_name: string;
  my_product: string;
  competitor_product: string;
}

// 生成竞争分析
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer_name, my_product, competitor_product }: CompetitiveAnalysisRequest = req.body;

    // 验证输入参数
    if (!customer_name || !my_product || !competitor_product) {
      res.status(400).json({
        code: 400,
        message: '请提供完整的客户名称、我方产品和竞争对手产品信息',
        data: null
      });
      return;
    }

    // 调用AI服务生成分析
    const analysisResult = await competitiveAnalysisService.generateAnalysis({
      customer_name,
      my_product,
      competitor_product
    });

    res.json({
      code: 200,
      message: '竞争分析生成成功',
      data: analysisResult
    });

  } catch (error: any) {
    console.error('Competitive analysis error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '竞争分析生成失败，请稍后重试',
      data: null
    });
  }
});

export default router;